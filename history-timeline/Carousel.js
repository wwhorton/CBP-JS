/**
 * Created by Bill on 7/18/2016.
 */

import Slide from "Slide";
import CarouselButton from "CarouselButton";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Carousel extends React.Component{
    constructor(props){
        super(props);
        this._changeSlide = this._changeSlide.bind(this);
    }
    _changeSlide(slideDirection) {
        let newSlideIndex = this.props.slideIndex;
        switch (slideDirection) {
            case "left":
            case "back":
            case "backward":
            case "backwards":
                if (newSlideIndex > 0) {
                    newSlideIndex--;
                } else {
                    newSlideIndex = this.props.maxSlideIndex;
                }
                break;
            case "right":
            case "forward":
                if (newSlideIndex === this.props.maxSlideIndex) {
                    newSlideIndex = 0;
                } else {
                    newSlideIndex++;
                }
                break;
            default:
                break;
        }
        this.props.callback(newSlideIndex);
    }
    render() {
        return (
            <div className="small-10 small-offset-1 columns carousel-wrapper">
                <div className="row collapse">
                    <div className="small-1 columns text-center">
                        <CarouselButton direction="left" callback={this._changeSlide}/>
                    </div>
                    <div className="small-10 columns">
                        <ReactCSSTransitionGroup transitionName="carouselSlide" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={false} transitionLeaveTimeout={500}>
                            <Slide image={this.props.slide.history_timeline_image} caption={this.props.slide.history_timeline_image_caption} title={this.props.slide.title} event={this.props.slide.history_timeline_event} key={this.props.slideIndex} />
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="small-1 columns text-center">
                        <CarouselButton direction="right" callback={this._changeSlide}/>
                    </div>
                </div>
            </div>
        );
    }
}