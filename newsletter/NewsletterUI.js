/**
 * Created by Bill on 6/7/2016.
 */

import NewsletterModal from "NewsletterModal";
import "foundation";

export default class NewsletterUI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            emailAddress: ""
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._closeModal = this._closeModal.bind(this);
    }
    static _validateEmail(email) {
        const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
        return regex.test(email);
    }
    _handleChange(event) {
        this.setState({
            emailAddress: event.target.value
        });
    }
    _handleClick() {
        this.setState({showModal: true});
    }
    _closeModal() {
        this.setState({showModal: false});
    }
    componentDidUpdate() {
        const modal = $(this.props.modalSelector); //$('#newsletterModal');
        (this.state.showModal) ? modal.foundation('reveal', 'open') : modal.foundation('reveal', 'close');
    }
    render() {
        const error = ( NewsletterUI._validateEmail(this.state.emailAddress) || !this.state.emailAddress ) ? '' :
            <div data-alert="" className="small-12 columns alert-box alert text-center">Please enter a valid email
                address.</div>;
        return (
            <div id="container">
                <NewsletterModal ref={ (ref) => this.modal = ref } email={this.state.emailAddress}
                                 callback={this._closeModal}/>
                <div className="row collapse newsletter-form">
                    <div className="small-8 columns">
                        <input type="email" name="email" placeholder="email" required=""
                               onChange={this._handleChange}
                               value={this.state.emailAddress}/>
                    </div>
                    <div className="small-4 columns">
                        <button
                            disabled={!NewsletterUI._validateEmail(this.state.emailAddress) || this.state.emailAddress === ""}
                            onClick={this._handleClick} className="button postfix">Subscribe
                        </button>
                    </div>
                    {error}
                </div>
            </div>
        );
    }
}