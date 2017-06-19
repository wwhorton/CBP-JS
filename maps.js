/**
 * Created by Bill on 3/8/2017.
 */

import MapUI from "MapUI";

const urlRoot = "//" + window.location.hostname;

// Map for 'Join a Group' page
if ($("#map-ui-container").length > 0) {
    let options = {
        showMapForm: true,
        mapUrl: urlRoot + '/action/mapJSON',
        type: "join a group"
    };
    ReactDOM.render(
        React.createElement(MapUI, options, null),
        document.querySelector('#map-ui-container')
    );
}

// Map for 'Take Action' page
if ($("#take-action-map-container").length > 0) {
    let options = {
        showMapForm: true,
        mapUrl: urlRoot + '/action/public-access-JSON',
        type: "public access"
    };
    ReactDOM.render(
        React.createElement(MapUI, options, null),
        document.querySelector('#take-action-map-container')
    );
}

//Map for 'State of the Chesapeake' page
const el = document.getElementById('soc-map');

if( el ){
    let options = {
        showMapForm: false,
        mapUrl: urlRoot + '/state/mapJSON/' + el.dataset.map,
        type: "state of the chesapeake"
    };
    ReactDOM.render( React.createElement(MapUI, options, null), el );
}