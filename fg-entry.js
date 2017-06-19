/**
 * Created by Bill on 3/7/2017.
 */

import slick from "slick-carousel";

window.addEventListener("load", function(){

    const carousel = $('#carousel');
    const modalCarousel = $('#modalCarousel');

    // Set listeners for modal carousel to handle overlay
    $(document).on('opened.fndtn.reveal', '[data-reveal]', function(){
        const modal = $(this);
        modal.find("#modalCarousel").slick('setPosition', 0);
    });
    $(document).on("opened.fndtn.clearing", function(event) {
        $("#navigation").css( 'z-index', '0' );
    });
    $(document).on("close.fndtn.clearing", function(event) {
        $("#navigation").css( 'z-index', '2000' );
    });

    if( carousel.length ) {
        // Carousel listeners
        $(".carousel-previous-arrow").on('click', function( e ){
            e.preventDefault();
            carousel.slick('slickPrev');
        });
        $(".carousel-next-arrow").on('click', function( e ){
            e.preventDefault();
            carousel.slick('slickNext');
        });
        $(".carousel-info-button").on('click', function( e ){
            e.preventDefault();
            $(".carousel-caption-container").toggleClass( 'carousel-caption-container--hidden' );
            let currentSlide = carousel.slick('slickCurrentSlide');
            carousel.slick('slickGoTo', currentSlide);
        });
        carousel.on('init', function (e) {
            $('.carousel-slide-navigation').show();
        }).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            adaptiveHeight: true,
            lazyLoad: "progressive",
            arrows: false,
            dots: false,
            autoplay: false
        });
    }

    if( modalCarousel.length ) {
        // Carousel listeners
        $(".modal-carousel-previous-arrow").on('click', function( e ){
            e.preventDefault();
            modalCarousel.slick('slickPrev');
        });
        $(".modal-carousel-next-arrow").on('click', function( e ){
            e.preventDefault();
            modalCarousel.slick('slickNext');
        });
        modalCarousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            adaptiveHeight: true,
            lazyLoad: "progressive",
            arrows: false,
            dots: false,
            autoplay: false
        });
    }


    // Find all YouTube videos
    // 6/13 - Changed the selector to exclude Vimeo videos, which are used in the Issues section where this code is also used.

    var $allVideos = $("iframe:not(.vimeo-iframe-container)"),
        // The element that is fluid width
        $fluidEl = $(".field_guide_content");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {
        $(this)
            .data('aspectRatio', this.height / this.width)
            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');
    });

    // When the window is resized
    $(window).resize(function() {
        var newWidth = $fluidEl.width();
        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {
            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));
        });

        // Kick off one resize to fix all videos on page load
    }).resize();
});