/**
 * Created by Bill on 3/8/2017.
 */

import _ from "underscore";
import $ from "jquery";
import EventForm from "calendar/EventForm";
import {globals} from "globals";


// Event calendar/agenda filtering
window.addEventListener( "load", function(){
    if ( $('#event-form').length === 1 ){
        var parseTypes = function( datum ) {
            return {
                name: datum.title,
                value: datum.url_title
            }
        };
        var array = [];
        var queryData = { 'entry_id': '5104|5105|5106|5107|5108|5108|5110|5111|5113|5114|5116|3370|3452|3669' };
        var types = $.ajax({
            url: '//' + window.location.host + '/JSON/groups',
            dataType: 'json',
            data: queryData,
            error: function( jqXHR, status, msg ){
                console.log( status );
                console.log( msg );
            }
        });
        $('.sponsor').each( function( ){
            array.push( $( this ).text().split(":") );
        });
        types.success(function( response ){
            var array = [];
            array.push( { 'name': 'All', 'value': 'All' } );
            _.each( response, function( item ){
                array.push( parseTypes( item ) );
            });
            ReactDOM.render(
                React.createElement(EventForm, { 'months': globals.months, 'types': array }, null ),
                document.querySelector('#event-form')
            );
        });
    }
});

/*******************************************************************************************************************
 *                                                                                                                 *
 * Minicalendar behavior                                                                                           *
 *                                                                                                                 *
 * ****************************************************************************************************************/

window.addEventListener( "load", function(){
    if( $(".minicalendar-container").length ) {
        // Minicalendar smoothed scrolling behavior
        const root = $('html, body');
        $(".minicalendar-dateLink").on('click', function (e) {
            console.log( this );
            e.preventDefault();
            root.animate({
                scrollTop: ($($.attr(this, 'href')).offset().top - 150)
            }, 500);
        });

        // Minicalendar fixed position behavior
        const footer = document.getElementsByTagName("footer")[0];
        const footerPosition = footer.getBoundingClientRect().top + window.scrollY;
        const footerHeight = footer.getBoundingClientRect().height;
        const miniCalendar = document.getElementsByClassName("minicalendar-container")[0];
        const miniCalendarBaseClass = "minicalendar-container medium-3 columns";
        const miniCalendarHeight = miniCalendar.getBoundingClientRect().height;
        const miniCalendarAbsoluteTop = footerPosition - footerHeight - miniCalendarHeight + "px";
        const miniCalendarBottom = miniCalendar.getBoundingClientRect().bottom;

        function scrollHandler(){
            if ((miniCalendarBottom + window.scrollY) >= footerPosition  ) {
                miniCalendar.className = miniCalendarBaseClass + " minicalendar-container--absolute";
                miniCalendar.style.top = miniCalendarAbsoluteTop;
            } else {
                miniCalendar.className = miniCalendarBaseClass + " minicalendar-container--fixed";
                miniCalendar.style.top = null;
            }
        }
        window.addEventListener("scroll", scrollHandler, true);
    }
}, { once: true, passive: true }, false);
