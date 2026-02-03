const auto_list = new Swiper(".auto_list", {
    slidesPerView: 3.2,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000, //ms 1초 = 1000//
        disableOnInteraction: false,
    },
    speed: 500,
    breakpoints: {
        450: {
            slidesPerView: 4,
        },
        600: {
            slidesPerView: 5,
        },
        1020: {
            slidesPerView: 6,
        },
        1500: {
            slidesPerView: 8,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

$(".pause").click(function () {
    auto_list.autoplay.stop();
    $(".pause").hide();
    $(".play").show();
});
$(".play").click(function () {
    auto_list.autoplay.start();
    $(".pause").show();
    $(".play").hide();

});

const reserve_list = new Swiper(".reserve_list", {
    loop: true,
    speed: 1000,
    navigation: {
        nextEl: ".reserve-next",
        prevEl: ".reserve-prev",
    },

});


