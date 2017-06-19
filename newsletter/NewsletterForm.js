/**
 * Created by Bill on 6/9/2016.
 */

export default class NewsletterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { subscribed: false };
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(event) {
        this.setState({subscribed: event.target.checked});
    }
    componentWillUnmount() {
        this.setState({
            subscribed: false
        });
    }
    componentWillMount() {
        this.setState({
            subscribed: false
        });
    }
    render() {
        return (
            <div className="row panel">
                <div className="small-1 columns">
                    <input type="checkbox" defaultChecked={this.state.subscribed}
                           name={this.state.newsletterTitle + "subscribe" }
                           key={this.props.newsletterTitle + '-check'} className="checkbox medium small-1 columns"
                           onChange={this._handleChange}/>
                </div>
                <div className="small-11 columns">
                    <div className="small-12 columns">
                        <h3>{this.props.newsletterTitle}</h3>
                    </div>
                    <div className="small-12 columns">
                        <p>{this.props.newsletterDescription}</p>
                    </div>
                </div>
            </div>
        )
    }
}
