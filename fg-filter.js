/**
 * Created by Bill on 4/7/2016.
 */

import _ from "underscore";

    // Make an object for the field guide filtering behavior for namespacing etc.
    const fgFilter = {
        pathname: window.location.pathname,
        rootURL: window.location.origin,
        category: {
            'fg-habitat': window.location.pathname.split('/')[3] || 'all',
            'fg-type': window.location.pathname.split('/')[4] || 'all',
            'fg-subtype': window.location.pathname.split('/')[5] || 'all'
        },
        setListeners( selector ){
            if (window.location.pathname.split('/')[2] === "field-guide") {
                let name, value;
                $(selector).on('change', function () {
                    const self = $(this);
                    name = self.prop('name');
                    value = self.children(':first-child').val();
                    if (name == 'fg-type') {
                        fgFilter.category['fg-subtype'] = 'all';
                    }
                    fgFilter.category[name] = value;
                    fgFilter.applyFilters();
                });
            }
        },
        buildNewURL(){
            let habitat, type, subtype, url;
            habitat = this.category['fg-habitat'];
            type = this.category['fg-type'];
            subtype = this.category['fg-subtype'];
            url = '/discover/field-guide/' + habitat + '/' + type + '/' + subtype;
            return url;
        },
        applyFilters(){
            window.location = this.buildNewURL();
        },
        checkURL( hasSegment, notSegment ) {
            if (this.pathname.includes( hasSegment ) && ( this.pathname.includes( notSegment ) == false )) {
                return true;
            }
        },
        parseURL( path ){
            const pathArray = path.split('/');
            return _.filter($('option'), function (option) {
                return option.value == pathArray[3] || option.value == pathArray[4] || option.value == pathArray[5];
            });
        },
        setActive( hasSegment, notSegment ){
            if ( this.checkURL( hasSegment, notSegment ) ) {
                const filtered = this.parseURL( this.pathname );
                $(filtered).attr( 'selected', true );
            }
        },
        activateSubtypeMenu( menuSelector ){
            $(menuSelector + '> select').attr('disabled', false);
        },
        getType( menuSelector ){
            return $( menuSelector + '> select' ).find( ":selected" ).text();
        },
        setSubType( typeMenu, subtypeMenu ){
            if ( this.getType( typeMenu ) != 'All Types' ){
                this.activateSubtypeMenu( subtypeMenu );
            }
        }

    };

    // Run everything once page is loaded
window.addEventListener("load", function(){
    fgFilter.setListeners( '.fg-filter-form' );
    fgFilter.setActive( 'field-guide', 'entry' );
    fgFilter.setSubType( '#fg-type', '#fg-subtype' );
});