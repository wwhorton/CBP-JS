/**
 * Created by Bill on 3/10/2016.
 */

import GoogleMap from "GoogleMap";
import MapForm from "MapForm";
import _ from "underscore";

export default class MapUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            center: {},
            radius: '',
            zip: '',
            max: 0,
            zoom: 6
        };
        this.defaultCenter = {lat: 38.6729, lng: -76.5012};
        this._getData = this._getData.bind(this);
        this._formCallback = this._formCallback.bind(this);
        this._getCenter = this._getCenter.bind(this);
        this._setZoom = this._setZoom.bind(this);
    }
    _getCenter( zip ) {
        let data = (zip === undefined || zip === '') ? {latlng: this.defaultCenter.lat + ',' + this.defaultCenter.lng} : {address: zip};
        //data.key = "AIzaSyB6gTdG-pNqEYGcQK9wEF_xkKIA53nxWU0";
        return $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: data,
            dataType: "json"
        });
    }
    componentWillReceiveProps( nextProps ){
        this.props = nextProps;
    }
    componentWillMount() {
        const self = this;
        //first check url for params
        var $_GET = {};
        if(document.location.toString().indexOf('?') !== -1) {
            var query = document.location
                .toString()
                // get the query string
                .replace(/^.*?\?/, '')
                // and remove any existing hash string (thanks, @vrijdenker)
                .replace(/#.*$/, '')
                .split('&');

            for(var i=0, l=query.length; i<l; i++) {
                var aux = decodeURIComponent(query[i]).split('=');
                $_GET[aux[0]] = aux[1];
            }
        }
        let radius = $_GET.radius === undefined ? self.state.radius : $_GET.radius;
        let zip = $_GET.zip === undefined ? self.state.zip : $_GET.zip;
        let max = $_GET.max === undefined ? self.state.max : $_GET.max; //default for unlimited

        //apparently doesn't work unless https

        if(zip === '' && window.location.protocol === 'https:') {
            //try to get user's location for mounting
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}});
                    }
                );
            }
        }

        self._getData( zip, radius, max ).then(function( data ){
            if( typeof data["0"].map_pins !== "undefined" ) {
                self.setState({data: data["0"].map_pins});
            } else {
                self.setState({data: data});
            }
        });
        self._getCenter( zip ).then(function( data ){
            self.setState({ center: data.results[0].geometry.location});
        });
        self._setZoom(radius);
    }
    shouldComponentUpdate( nextProps, nextState ){
        return (  ( nextState.data !== this.state.data ) || ( nextState.center !== this.state.center ) );
    }
    _getData( zip, radius, max = 0 ){
        const self = this;
        self.setState({ radius: radius, zip: zip, max: max });
        return $.ajax({
            url: this.props.mapUrl,
            data: {
                'zip': zip,
                'radius': radius,
                'max': max
            },
            dataType: 'json'
        });
    }
    _setZoom(radius){
        let z;
        if(radius <= 0) z = 6;
        else if(radius <= 10) z = 11;
        else if(radius <=25) z = 10;
        else if(radius <=50) z = 9;
        else if(radius <=100) z = 7;
        else z = 6;
        this.setState({ zoom: z});
    }
    _formCallback( data ) {
        const self = this;
        const radius = parseInt( data[1].value );
        const zip =  parseInt( data[0].value );
        const max = parseInt( data[2].value );
        if(isNaN(zip)) return;
        const searchButton = $("#group-search-link");
        searchButton.text('Searching...');
        searchButton.addClass('disabled');
        this._getData( zip, radius, max ).then(function( data ){
            self.setState({ data: data });
            searchButton.removeClass('disabled');
            searchButton.text('Search');
        });
        self._getCenter( zip ).then(function( data ){
            self.setState({ center: data.results[0].geometry.location});
        });
        self._setZoom(radius);
    }
    render() {
        let formParams = {radius: this.state.radius, zip: this.state.zip, max: this.state.max};
        let center = _.isEmpty(this.state.center) ? this.defaultCenter : this.state.center
        return (
            <div className="map-ui-container">
                { this.props.showMapForm &&
                <div className="row">
                    <div className="small-12 large-3 columns">
                        <MapForm callback={this._formCallback} type={this.props.type} params={formParams} />
                        <div>
                            { this.props.type !== 'public access' &&
                            <div className="small-12 columns panel">
                                <p className="small-text">These watershed organizations are essential partners in
                                    restoring and preserving the Bay's rivers and streams. We encourage you to find out which
                                    groups are active in your area and get involved!</p>
                                <p className="small-text">If your organization is not included in this directory,
                                    contact Amy Handen at 410-260-2493 or <a href="mailto:ahanden@chesapeakebay.net">ahanden@chesapeakebay.net</a>
                                </p>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="small-12 large-9 columns">
                        <GoogleMap locationArray={this.state.data} center={center} key={this.state.data} type={this.props.type} zoom={this.state.zoom} />
                    </div>
                </div>
                }
                { !this.props.showMapForm &&
                <div className="row">
                    <div className="small-12 large-10 large-offset-1 columns">
                        <GoogleMap locationArray={this.state.data} center={center} key={this.state.data} type={this.props.type} zoom={this.state.zoom} />
                    </div>
                </div>
                }
            </div>
        );
    }
}