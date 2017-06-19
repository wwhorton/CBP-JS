/**
 * Created by Bill on 3/3/2017.
 */

// Site navigation code; runs on each page

// Imports

import NavigationArea from 'NavigationArea';
import OffcanvasNavigation from 'OffcanvasNavigation';

// Check device size and render appropriate navigation
if( window.innerWidth > 976 ) {
    ReactDOM.render(
        React.createElement(NavigationArea, null),
        document.querySelector('#navigation')
    );
} else {
    // React navigation for Small down
    ReactDOM.render(
        React.createElement(OffcanvasNavigation, null),
        document.querySelector('#navigation')
    );
}

// Reset scroll position on each page refresh
window.addEventListener("unload", function(){
    window.scroll(0,0);
}, false);

