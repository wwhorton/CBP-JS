/**
 * Created by Bill on 7/6/2016.
 */

import _ from "underscore";
import MarkerClusterer from "node-js-marker-clusterer";
import InfoWindow from "GoogleMapInfoWindow";
import InfoWindowContents from "GoogleMapInfoWindowContents";
import LazyLoad from 'react-lazyload';

export default class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeMarker: null,
            infoWindowOpen: false,
            bounds: new google.maps.LatLngBounds()
        };
        this.markers = this.googleMarkers = [];
        this.infoWindowContentsLoaded = false;
        this.infoWindowContentsMaxHeight = 0;
        _.bindAll(this,
            '_clusterMarkers',
            '_infoWindowCallback',
            '_initializeMap',
            '_markerClick',
            '_genMarkers',
            '_setMarkers',
            '_infoWindowContentsCallback'
        );
    }
    _genMarkers(array, type) {
        let markers = [];
        const self = this;
        if( type === 'public access' && typeof type !== 'undefined' ) {
            _.each(array, function (marker) {
                markers.push(this._genPAMarkerObj(marker));
            }.bind(this));
        } else if ( type === 'state of the chesapeake' && typeof type !== 'undefined' ) {
            _.each(array, function (marker) {
                markers.push(this._addSoCMarker(marker, self.state.map));
            }.bind(this));
        } else {
            _.each(array, function (marker) {
                markers.push(this._genMarkerObj(marker));
            }.bind(this));
        }
        this.markers = markers;
    }
    _genMarkerObj(marker){
        marker.latitude = marker.group_latitude;
        marker.longitude = marker.group_longitude;
        let pt = new google.maps.LatLng( marker.latitude, marker.longitude );
        this.state.bounds.extend( pt );
        const location = {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
        return {
            position: location,
            title: marker.title,
            address: marker.group_street_address,
            city: marker.group_city,
            state: marker.group_state,
            zip: marker.group_zipcode,
            url: marker.group_url,
            email: marker.group_contact_email,
            contact: marker.group_contact_title + " " + marker.group_contact,
            contactPhone: marker.group_phone
        };
    }
    _genPAMarkerObj(marker) {
        marker.latitude = marker.public_access_latitude;
        marker.longitude = marker.public_access_longitude;
        let pt = new google.maps.LatLng( marker.latitude, marker.longitude );
        this.state.bounds.extend( pt );
        const location = {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
        return {
            position: location,
            title: marker.title,
            address: marker.public_access_address,
            city: marker.public_access_city,
            state: marker.public_access_state,
            zip: marker.public_access_zip_code,
            boatRamp: marker.public_access_boat_ramp,
            fishing: marker.public_access_fishing,
            swimming: marker.public_access_swimming,
            trail: marker.public_access_trail,
            restroom: marker.public_access_restroom,
            parking: marker.public_access_parking,
            region: marker.public_access_region,
            county: marker.public_access_county
        };
    }
    _setMarkers(map) {
        // Set Markers
        let markers = [];
        _.each(this.markers, function (marker) {
            markers.push(new google.maps.Marker(
                Object.assign(marker, {map: map})
            ));
        }.bind(this));
        this.googleMarkers = markers;
    }
    _addSoCMarker(marker, map) {
        const location = {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
        let pt = new google.maps.LatLng( marker.latitude, marker.longitude );
        this.state.bounds.extend( pt );
        return new google.maps.Marker({
            position: location,
            map: map,
            title: marker.label,
            description: marker.description,
            url: marker.link
        });
    }
    _initializeMap(options) {
        options.container = options.container || {};
        options.center = options.center || {};
        options.zoom = options.zoom || 10;
        return new google.maps.Map(options.container, {
            center: options.center,
            zoom: options.zoom,
            scrollwheel: false
        });
    }
    _clusterMarkers(map) {
        const clusterOptions = {gridSize: 50, maxZoom: 15, imagePath: '/images/'};
        let markers = this.googleMarkers;
        const self = this;
        _.map(markers, function (marker) {
            marker.addListener('click', function () {
                self._markerClick(this);
            }, true);
        });
        if( markers.length > 11 ) {
            this.markerCluster = new MarkerClusterer(map, markers, clusterOptions);
        }
    }
    _markerClick(marker) {
        this.setState({
            activeMarker: marker,
            infoWindowOpen: true,
            center: marker.position
        });
        this.state.map.panTo( this.state.center );
    }
    _infoWindowCallback() {
        this.setState({
            activeMarker: null,
            infoWindowOpen: false
        });
    }
    _infoWindowContentsCallback(infoWindowContentDOM){
        let height = $(infoWindowContentDOM).outerHeight();
        if(height > this.infoWindowContentsMaxHeight){
            $(document).foundation('equalizer', 'reflow');
            this.infoWindowContentsMaxHeight = height;
        }
    }
    // Lifecycle methods
    componentDidMount() {
        const self = this;
        let map = self._initializeMap({container: self.ref, center: self.props.center, zoom: self.props.zoom});
        self.setState({
            map: map
        }, function(){
            map.fitBounds(this.state.bounds);
        });

    }
    componentWillUpdate(prevProps, prevState) {
        const self = this;
        this._genMarkers(self.props.locationArray, self.props.type);
    }
    componentDidUpdate(prevProps, prevState) {
        const self = this;
        this._setMarkers(self.state.map);
        this._clusterMarkers(self.state.map);
        let mapListener = self.state.map.addListener('click', function(){
            self.setState({ infoWindowOpen: false, activeMarker: null }, function(){
                mapListener.remove();
            });
        });

        $(document).foundation('equalizer', 'reflow');
    }
    render() {
        const self = this;
        let divStyle = {height: '520px'};
        let markers = this.markers;
        let type = this.props.type;
        let resultRows = markers.map(function(marker){
            return(
                <div className="small-12 medium-6 large-4 columns end">
                    <div className="panel" data-equalizer-watch>
                        <LazyLoad offset={100} once>
                            <InfoWindowContents marker={marker} type={type} callback={self._infoWindowContentsCallback} />
                        </LazyLoad>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <div className="googleMapContainer" id="map-container" style={divStyle} ref={ ( ref ) => this.ref = ref }>
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.infoWindowOpen} map={this.state.map} callback={this._infoWindowCallback} type={this.props.type} />
                </div>
                <div className="results top-margin" id="results-list">
                    <h3>Displaying { markers.length } {type == 'public access' ? 'Sites' : 'Groups'}</h3>
                    <div className="row" data-equalizer data-equalizer-mq="medium-up">
                        {(markers.length > 0) && resultRows}
                    </div>
                </div>
            </div>

        );
    }
}