/**
 * Created by Bill on 7/13/2016.
 */

import CarouselUI from "history-timeline/CarouselUI";

const carousel = document.getElementById("carousel-container");
const url = "//" + window.location.hostname + "/JSON/history_timeline";

$.ajax({
    url: url,
    dataType: "json"
}).done(function (data) {
    ReactDOM.render(
        <CarouselUI slides={data}/>,
        carousel
    );
}).error(function(msg){
    console.log( "Error" );
    console.log( msg );
});