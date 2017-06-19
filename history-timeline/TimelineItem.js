/**
 * Created by Bill on 7/18/2016.
 */
export default class TimelineItem extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick( event ) {
        (this.props.callback) ? this.props.callback(event, this.props.index) : null;
    }
    render() {
        const itemClass = (this.props.active) ? "small-12 columns text-center active" : "text-center small-12 columns";
        return (
            <div className={itemClass} onClick={this._handleClick}>
                <div className="small-12 columns">
                    {(this.props.active) ? <h2 className="timeline-date active">{this.props.item.title}</h2> : <h3 className="timeline-date">{this.props.item.title}</h3> }
                </div>
                <div className="small-12 columns">
                    <i className="fa fa-circle text-center" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}