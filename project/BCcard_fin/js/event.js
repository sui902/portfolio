const event_list = new Swiper(".event_list", {
    autoplay: {
        delay: 5000, //ms 1초 = 1000//
        disableOnInteraction: false,
    },

    loop: true,

    speed: 1000,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
})