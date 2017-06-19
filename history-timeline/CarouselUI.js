/**
 * Created by Bill on 7/18/2016.
 */

import Carousel from "Carousel";
import Timeline from "Timeline";

export default class CarouselUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
        this._setActiveSlide = this._setActiveSlide.bind(this);
    }
    _setActiveSlide(newSlideIndex) {
        this.setState({'activeSlide': newSlideIndex});
    }
    render() {
        return (
            <div className="row">
                <div className="small-12 columns carousel-ui-container">
                    <h2 className="small-10 small-offset-1 columns">Bay History Timeline</h2>
                    <Timeline key="the-timeline" items={ this.props.slides } activeItem={ this.state.activeSlide }
                              callback={this._setActiveSlide}/>
                    <div className="decorative-triangle"></div>
                    <Carousel key="the-carousel" slide={ this.props.slides[this.state.activeSlide] }
                              slideIndex={ this.state.activeSlide }
                              maxSlideIndex={ this.props.slides.length - 1 } callback={this._setActiveSlide}/>
                </div>
            </div>
        );
    }
}