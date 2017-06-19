/**
 * Created by Bill on 7/18/2016.
 */

import _ from "underscore";

export default class CarouselButton extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event) {
        this.props.callback(this.props.direction);
    }

    componentWillMount() {
        // Throttle the click to prevent clicks outrunning the load animation
        this._handleClick = _.throttle(this._handleClick, 600, {trailing: false});
    }

    render() {
        let buttonIcon = "*";
        switch (this.props.direction) {
            case "forward":
            case "right":
                buttonIcon = "fa fa-5x fa-angle-right";
                break;
            case "backward":
            case "backwards":
            case "back":
            case "left":
                buttonIcon = "fa fa-5x fa-angle-left";
                break;
            default:
                break;
        }
        return (
            <div className="carousel-button" onClick={this._handleClick}><i className={buttonIcon}></i></div>
        );
    }
}