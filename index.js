/**
 * Created by Bill on 3/6/2017.
 */
// Scripts for index page

import 'slick-carousel';

// Carousels
const FGScroller = $('#FGScroller');
const hero = $('#hero-carousel');

hero.on('init', function (e) {
    $(".hide-for-small-up").removeClass("hide-for-small-up");
}).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    autoplay: false,
    adaptiveHeight: false,
    lazyLoad: "progressive",
    autoplaySpeed: 6000,
    responsive: [{
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});

hero.on('setPosition', function(s){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var slickList = $(s.target).find('.slick-list');
    var newHeight = windowHeight - $('#navigation nav').outerHeight(true);

    if (slickList.length && slickList.outerHeight() >= newHeight && windowWidth > 640 && windowHeight > 400 && windowWidth > windowHeight)
        slickList.css('height', newHeight);
    else slickList.css('height', '');
});

FGScroller.slick({
    slidesToScroll: 1,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    dots: true,
    centerMode: false,
    centerPadding: '12%',
    autoplay: false,
    autoplaySpeed: 6000,
    lazyLoad: "progressive",
    mobileFirst: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
            }
        }]
});



