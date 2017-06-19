/**
 * Created by Bill on 3/8/2017.
 */

const eventsCarousel = $('.groupUpcomingEventsCarouselContainer');

eventsCarousel.slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    infinite: false,
    arrows: false,
    dots: true,
    centerMode: true,
    autoplay: false,
    adaptiveHeight: true,
    initialSlide: 1,
    autoplaySpeed: 6000,
    lazyLoad: "ondemand",
    mobileFirst: false,
    responsive: [{
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        }
    }]
});


$(function(){
    $(".accordion").on('toggled', function(e, accordion){
        $(accordion).closest(".accordion-navigation").find(".accordion-icon").toggleClass('fa-plus fa-minus')
    });
});

$(document).foundation('accordion', 'reflow');