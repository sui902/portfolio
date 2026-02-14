AOS.init({
  duration: 1000,
});

window.addEventListener('scroll', function () {
  const header = document.querySelector('#header');
  const visual = document.querySelector('.visual'); // 비주얼 영역 선택

  if (window.scrollY > 50) {
    header.classList.add('on-scroll');
    if (visual) visual.classList.add('on-scroll-margin');
  } else {
    header.classList.remove('on-scroll');
    if (visual) visual.classList.remove('on-scroll-margin');
  }
});

const plan_list = new Swiper(".plan_list", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    600: {
      slidesPerView: 1.7,
      centeredSlides: true,
    },
    700: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    800: {
      slidesPerView: 2.3,
      centeredSlides: true,
    },
    960: {
      slidesPerView: 1,
    },
    1375: {
      slidesPerView: 2,
    },
    1600: {
      slidesPerView: 2.3,
    },
    1840: {
      slidesPerView: 2.5,
    },
  },
  loop: true,
  autoplay: {
    delay: 3000, //ms 1초 = 1000//
    disableOnInteraction: false,
  },
  speed: 1600,
});