AOS.init({
  duration: 1000,
});

const visual_list = new Swiper(".visual_list", {
  loop: true,
  autoplay: {

    delay: 8000, //ms 1초 = 1000//
    disableOnInteraction: false,
  },

  speed: 1000,

  navigation: {
    nextEl: ".visual-next",
    prevEl: ".visual-prev",
  },
  pagination: {
    el: ".pn01",
    type: "bullets",
  },
});

$(".pause").click(function () {
  visual_list.autoplay.stop();
  $(".pause").hide();
  $(".play").show();
});
$(".play").click(function () {
  visual_list.autoplay.start();
  $(".pause").show();
  $(".play").hide();

});



function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// ----------------------------------------------------
// 2. 카드 상세 정보 업데이트 함수 (분리 및 최적화)
//    - 섹션 이름(wrapperClass)을 받아 해당 영역만 제어하도록 수정
// ----------------------------------------------------
function updateCardContentByIndex(idx, wrapperClass, textClass) {
  // ⭐ .stop(true, true)를 사용하여 빠른 클릭으로 인한 애니메이션 충돌 방지
  $(wrapperClass).eq(idx)
    .stop(true, true)
    .fadeIn(600)
    .siblings()
    .stop(true, true)
    .hide();

  // 모든 텍스트 클래스가 아닌, 해당 섹션의 텍스트 클래스만 처리
  $(textClass).addClass("active");
}

// ----------------------------------------------------
// 3. 초기 상태 설정 (기존 jQuery 로직 재사용 및 정리)
// ----------------------------------------------------
// best_list 영역 초기 설정
$(".card_info .card_style:not(:first-child)").hide();
// vip_list 영역 초기 설정
$(".card_info .card_style02:not(:first-child)").hide();



const best_list = new Swiper(".best_list", {
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {

    860: {
      slidesPerView: 6,
    },

    1200: {
      slidesPerView: 7,
    },

    1500: {
      slidesPerView: 8,
    },
  },
  navigation: {
    nextEl: ".card-next",
    prevEl: ".card-prev",
  },

});



$(".best_list li").click(function () {
  const idx = $(this).index();

  // Swiper 강제 이동 코드는 제거하고, 수동으로 Swiper 이동
  best_list.slideTo(idx);

  // 분리된 함수 호출 (상단 상세 카드 업데이트)
  updateCardContentByIndex(idx, ".card_info .card_style", ".card_info .card_style .card_txt");
});

/// [best_list] Swiper 슬라이드 변경 이벤트 (조건부 적용)
best_list.on('slideChangeTransitionEnd', function () {
  // ⭐️ 860px 미만(모바일)일 때만 자동 동기화 실행
  if (window.innerWidth < 860) {
    const currentActiveIndex = this.realIndex;

    // Swiper가 움직였을 때 상단 상세 카드 업데이트
    updateCardContentByIndex(currentActiveIndex,
      ".card_info .card_style",
      ".card_info .card_style .card_txt");
  }
  // 860px 이상 (데스크톱): 아무것도 하지 않음. 클릭만 허용.
});


const vip_list = new Swiper(".vip_list", {
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {

    860: {
      slidesPerView: 6,
    },

    1200: {
      slidesPerView: 7,
    },

    1500: {
      slidesPerView: 8,
    },
  },

  navigation: {
    nextEl: ".card-next02",
    prevEl: ".card-prev02",
  },
});



$(".vip_list li").click(function () {
  const idx = $(this).index();

  // Swiper 강제 이동
  vip_list.slideTo(idx);

  // 분리된 함수 호출 (상단 상세 카드 업데이트)
  updateCardContentByIndex(idx, ".card_info .card_style02", ".card_info .card_style02 .card_txt");
});

// B. Swiper 슬라이드 변경 이벤트 (버튼/드래그 시)
// [vip_list] Swiper 슬라이드 변경 이벤트 (조건부 적용)
vip_list.on('slideChangeTransitionEnd', function () {
  // ⭐️ 860px 미만(모바일)일 때만 자동 동기화 실행
  if (window.innerWidth < 860) {
    const currentActiveIndex = this.realIndex;

    // Swiper가 움직였을 때 상단 상세 카드 업데이트
    updateCardContentByIndex(currentActiveIndex,
      ".card_info .card_style02",
      ".card_info .card_style02 .card_txt");
  }
  // 860px 이상 (데스크톱): 아무것도 하지 않음. 클릭만 허용.
});
// ----------------------------------------------------
// 9. 리사이즈 이벤트 (두 Swiper 모두 업데이트)
// ----------------------------------------------------
window.addEventListener('resize', debounce(function () {
  best_list.update();
  vip_list.update(); // vip_list도 리사이즈 이벤트에 추가
}, 250));



/* card_list */
$(".card_style:not(:first-child)").hide();
$(".best_list li").click(function () {
  let idx = $(this).index();
  $(".card_info .card_style").eq(idx).stop().fadeIn(600).siblings().hide();
  $(".card_txt").addClass("active");
});

/* vip_list */
$(".card_style02:not(:first-child)").hide();
$(".vip_list li").click(function () {
  let idx = $(this).index();
  $(".card_info .card_style02").stop().eq(idx).fadeIn(600).siblings().hide();
});

/* mytag */
const tag_list = new Swiper(".tag_list", {
  navigation: {
    nextEl: ".tag-next",
    prevEl: ".tag-prev",
  },
  pagination: {
    el: ".pn02",
    type: "fraction",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1300: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});



// 버튼 클릭 시 필터
$(".button_box button").click(function () {
  // 클릭한 버튼만 active
  $(this).addClass("active").siblings().removeClass("active");

  let filterValue = $(this).data("filter");

  // 모든 슬라이드 숨기고 필터된 것만 표시
  if (filterValue && filterValue !== "*") {
    $(".mytag .swiper-slide").hide();
    $(filterValue).show();
  } else {
    $(".mytag .swiper-slide").show(); // 전체 버튼일 때
  }

  // Swiper 재정렬
  tag_list.update();
});


/* finance */
const finance_list = new Swiper(".finance_list", {
  autoplay: {

    delay: 5000, //ms 1초 = 1000//
    disableOnInteraction: false,
  },

  speed: 1000,

  navigation: {
    nextEl: ".finance-next",
    prevEl: ".finance-prev",
  },
  pagination: {
    el: ".pn04",
    type: "bullets",
  },
});

const rsp_list = new Swiper(".rsp_list", {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: ".pn03",
    type: "bullets",
  },
});

$(".rsp_list02 ul:not(:first-child)").hide();
$(".notice_button button").click(function () {
  let idx = $(this).index();
  $(".rsp_list02 ul").eq(idx).fadeIn().siblings().hide();
  $(this).addClass("active").siblings().removeClass("active");
})
