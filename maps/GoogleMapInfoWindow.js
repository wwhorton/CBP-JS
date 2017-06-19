/**
 * Created by Bill on 7/7/2016.
 */

import _ from "underscore";
import InfoWindowContents from "GoogleMapInfoWindowContents";

export default class GoogleMapInfoWindow extends React.Component{
    constructor(props){
        super(props);
        _.bindAll( this,
            '_openWindow',
            '_closeWindow',
            '_renderInfoWindow',
            '_updateContent',
            '_handleClick'
        );
    }
    _openWindow(){
        this.infoWindow.open( this.props.map, this.props.marker );
    }
    _closeWindow(){
        this.infoWindow.close();
    }
    _renderInfoWindow(){
        //renders an empty infoWindow
        const iw = this.infoWindow = new google.maps.InfoWindow({
            content: ``
        });
    }
    _updateContent(){
        this.infoWindow.setContent( this.ref );
    }
    _handleClick(){
        this.props.callback();
    }
    componentDidUpdate( oldProps, oldState ){
        if( this.props.map !== oldProps.map ){
            this._renderInfoWindow();
        }
        if( this.props.marker !== oldProps.marker ){
            this._closeWindow();
            this._updateContent();
            this._openWindow();
        }
        if( this.props.visible !== oldProps.visible ){
            this.props.visible ?
                this._openWindow() :
                this._closeWindow();
        }
    }
    render() {
        let socMarker;
        if( this.props.marker !== null ){
            socMarker = (this.props.marker.url) ? <a href={ this.props.marker.url } target="_blank">{this.props.marker.title}</a> : this.props.marker.title;
        }

        return (
            <div ref={ (ref) => this.ref = ref } className="small-12 columns markerInfoWindow"
                 onClick={this._handleClick}>
                <InfoWindowContents marker={this.props.marker} type={this.props.type} />
            </div>
        );
    }
}
