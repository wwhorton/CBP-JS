/**
 * Created by Bill on 7/18/2016.
 */

import _ from "underscore";
import TimelineItem from "TimelineItem";

export default class Timeline extends React.Component{
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this._centerTimeline = this._centerTimeline.bind(this);
        this._handleDragStart = this._handleDragStart.bind(this);
        this._handleDrag = this._handleDrag.bind(this);
        this._handleDragEnd = this._handleDragEnd.bind(this);
    }
    _handleClick(event, key) {
        event.stopPropagation();
        event.preventDefault();
        this.props.callback(key);
        this._centerTimeline(this.props.activeItem, $("#" + this.props.activeItem));

    }
    _centerTimeline(slide, item) {
        const windowCenter = window.innerWidth / 2;
        const itemWidth = item.outerWidth();
        const itemOffset = $(item).offset().left;
        const timelinePosition = $(this.list).position().left;
        this.translate = ( (itemOffset - timelinePosition - windowCenter) + itemWidth / 2 ) * -1;
        $(this.list).css("transform", "translateX(" + this.translate + "px )");
    }
    _handleDragStart( event ) {
        const list = $(this.list);
        //Set initial position to equal event X
        this.position = event.clientX;
        //Add class to prevent child elements from blocking drag event
        list.addClass('drag-in-progress');
        //Set listeners
        list.on('drag', this._handleDrag);
        list.on('dragend', this._handleDragEnd );
    }
    _handleDrag( event ) {
        event.preventDefault();
        // Set a multiplier to magnify the drag effect speed
        const dragMultiplier = 2;
        //Check to see if we're moving right, left, or staying still
        if( this.position > event.clientX ) {
            this.translate -= Math.abs(this.position - event.clientX) * dragMultiplier;
        } else if( this.position < event.clientX ){
            this.translate += Math.abs(this.position - event.clientX) * dragMultiplier;
        } else {
            // End the drag event to avoid funky instability if no dragging is happening
            this._handleDragEnd( event )
        }
        //If the translation would move the list offscreen, reset it
        if( this.translate > 682 ) { this.translate = 682; }
        //Perform the translation
        $(this.list).css("transform", "translateX(" + this.translate + "px )");
        //Set slide that is closest to the center as the "closest slide" so we can fire the callback on dragEnd
        let closest = null;
        const slides = $(".timeline-item");
        const center = window.innerWidth / 2;
        this.slide = _.find( slides, function( slide ){
            let distance = Math.abs( center - ( $(slide)[0].getBoundingClientRect().left + $(window)['scrollLeft']() ) );
            if( closest > distance || closest === null ){
                closest = distance;
                return false;
            } else {
                return true;
            }
        });
        //Set this.position to equal event position for next go round
        this.position = event.clientX;
    }
    _handleDragEnd( event ){
        event.preventDefault();
        event.stopPropagation();
        const list = $(this.list);
        //Set the slide closest to center as the active slide
        this.props.callback( $(this.slide).attr('id') - 1 );
        //Remove event listeners
        list.off('drag', this._handleDrag );
        list.off('dragend', this._handleDragEnd );
        //Remove class to restore interaction with child elements
        list.removeClass('drag-in-progress');
    }
    componentDidMount() {
        const list = $(this.list);
        this._centerTimeline(this.props.activeItem, $("#" + this.props.activeItem));
        /* To Do: restore swipe behavior on mobile
        list.on('dragstart', this._handleDragStart );
        //Fix for weird drag event coordinate behavior
        document.addEventListener("dragover", function( event ) {
            event.preventDefault();
        }, false);
        document.addEventListener("drop", function( event ) {
            event.preventDefault();
        }, false);
        document.addEventListener("dragenter", function( event ) {
            event.preventDefault();
        }, false);
        document.addEventListener("dragleave", function( event ) {
            event.preventDefault();
        }, false);
        */
    }
    componentWillMount(){
        this._handleDrag = _.throttle( this._handleDrag, 80, {leading: true, trailing: true} );
    }
    componentDidUpdate() {
        this._centerTimeline(this.props.activeItem, $("#" + this.props.activeItem));
    }
    render() {
        const parent = this;
        return (
            <div className="timeline-outer-wrapper">
                <div className="small-10 small-offset-1 columns timeline-wrapper">
                    <div className="dotted-line-fade-left show-for-large-up"></div>
                    <div id="dottedLineDiv"></div>
                    <div className="small-8 small-offset-2 large-8 large-offset-2 columns timeline-inner-wrapper">
                        <ul ref={ (ref) => this.list = ref } draggable={true} className="inline-list no-bullet" id="timeline">
                            {this.props.items.map(function (item, key) {
                                return (
                                    <li className="timeline-item" id={key} key={key + '-li'} >
                                        <TimelineItem item={item} index={key} key={key} callback={parent._handleClick}
                                                      active={ key === parent.props.activeItem }/>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="dotted-line-fade-right show-for-large-up"></div>
                </div>
            </div>
        );
    }
}