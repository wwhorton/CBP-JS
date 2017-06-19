/**
 * Created by Bill on 6/7/2016.
 */

import { globals } from "../globals";
import NewsletterForm from "NewsletterForm";

export default class NewsletterModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            forms: [],
            results: []
        };
        this._handleSubscribe = this._handleSubscribe.bind(this);
        this._processForms = this._processForms.bind(this);
        this._updateState = this._updateState.bind(this);
        this._closeModal = this._closeModal.bind(this);
    }
    componentDidMount() {
        $(document).foundation('reveal', 'reflow');
    }
    _handleSubscribe() {
        this._updateState(function () {
            $.when.apply($, this._processForms(this.state.forms)).done(function () {
                let array = [];
                if (Array.isArray(arguments[0])) {
                    for (let i = 0; i < arguments.length; i++) {
                        array.push(arguments[i][0]);
                    }
                } else {
                    array.push(arguments[0]);
                }
                this.setState({results: array});
            }.bind(this));
        });
    }
    _subscribe(form) {
        return $.ajax({
            url: "newsletter.php",
            data: {
                EMAIL: form.email,
                request_method: "POST",
                api_call: form.formAction,
                newsletter_title: form.newsletterTitle
            },
            dataType: "json",
            method: "POST",
            error: function (xhr, status, error) {
                console.error(status);
                console.error(error);
                alert("There was a problem processing your request.");
            },
            success: function (data, status, xhr) {
                return data[0];
            }
        }).promise();
    }
    _processForms(array) {
        const self = this;
        let results = [];
        array.forEach(function (form) {
            if (form.state.subscribed) {
                results.push(self._subscribe(form.props));
            }
        });
        return results;
    }
    _updateState(callback) {
        this.setState({
            forms: [this.form1, this.form2, this.form3]
        }, callback);
    }
    _closeModal(event) {
        event.preventDefault();
        $('#newsletterModal').foundation('reveal', 'close');
        this.props.callback();
    }
    render() {
        let results = [];
        for (let i = 0; i < this.state.results.length; i++) {
            results.push(<div><h4>{this.state.results[i].newsletter_title}</h4><p key={i}>
                <strong>{ this.state.results[i].title || "Success!"}</strong> {this.state.results[i].email_address} {this.state.results[i].detail || " is subscribed. Check your email for a confirmation link."}
            </p></div>);
        }
        return (
            ( this.state.results.length < 1  ) ?
                <div id="newsletterModal" ref={ (ref) => this.DOMNode = ref } className="reveal-modal" data-reveal
                     aria-labelledby="modalTitle"
                     aria-hidden="true" role="dialog">
                    <h2 id="modalTitle">Newsletters</h2>
                    <NewsletterForm ref={ (ref) => this.form1 = ref } key="1" newsletterTitle="Bay News"
                                    email={this.props.email}
                                    newsletterDescription={globals.newsletterDescriptions.BayNews}
                                    formAction="/lists/71ced15df1/members"/>
                    <NewsletterForm ref={ (ref) => this.form2 = ref } key="2" newsletterTitle="Chesapeake Currents"
                                    email={this.props.email}
                                    newsletterDescription={globals.newsletterDescriptions.ChesapeakeCurrents}
                                    formAction="/lists/12fd2990c9/members"/>
                    <NewsletterForm ref={ (ref) => this.form3 = ref } key="3" newsletterTitle="Bay Brief"
                                    email={this.props.email}
                                    newsletterDescription={globals.newsletterDescriptions.BayBrief}
                                    formAction="/lists/69e9ffe1b6/members"/>
                    <button type="button" className="button default right" id="subscribe-button"
                            onClick={this._handleSubscribe}>Subscribe
                    </button>
                    <a className="close-reveal-modal" onClick={this._closeModal} aria-label="Close">&#215;</a>
                </div>
                :
                <div id="newsletterModal" ref={ (ref) => this.DOMNode = ref } className="reveal-modal" data-reveal
                     aria-labelledby="modalTitle"
                     aria-hidden="true" role="dialog">
                    <h2 id="modalTitle">Results</h2>
                    { results }
                    <a className="close-reveal-modal" onClick={this._closeModal} aria-label="Close">&#215;</a>
                </div>
        )
    }
}