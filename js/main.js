AOS.init({
    duration: 1000,
});

const visual_list01 = new Swiper(".visual_list01", {
    slidesPerView: 1.5,
    breakpoints: {
        660: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        1100: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1360: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
        1600: {
            slidesPerView: 2.4,
        },
        1920: {
            slidesPerView: 2.8,
        },
    },
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    speed: 8000,
    autoplay: {
        delay: 0,
    },
});

const visual_list02 = new Swiper(".visual_list02", {
    slidesPerView: 1.5,
    breakpoints: {
        660: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        1100: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1360: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
        1600: {
            slidesPerView: 2.4,
        },
        1920: {
            slidesPerView: 2.8,
        },
    },
    spaceBetween: 0,
    loop: true,
    initialSlide: 2,
    speed: 8000,
    autoplay: {
        delay: 0,
        reverseDirection: true,
    },
});

const team_list = new Swiper(".team_list", {
    loop: true,
    autoplay: {
        delay: 3000, //ms 1초 = 1000//
        disableOnInteraction: false,
    },
    speed: 1000,
    parallax: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
});

var swiper = new Swiper(".graphic_list", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",

    coverflowEffect: {
        depth: 340, /* 수치가 높을수록 중앙 슬라이드와 양옆 슬라이드 간의 원근감 거리가 멀게 느껴짐 */
        modifier: 1, /* 효과배수, 슬라이드 넘어갈때 움직임이 커짐 */
        rotate: 10, /* 가운데 슬라이드 양옆 슬라이드 X축 각도 */
        scale: 1,
        slideShadows: false, /* 그림자 true, false */
        stretch: 0, /* 수치가 높을수록 많이 겹침 */
    },
    loop: true,
    speed: 1000,

    autoplay: {
        delay: 5000, //ms 1초 = 1000//
        disableOnInteraction: false,
    },
});

const topBtn = document.querySelector(".gotop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) { // 400px 이상 스크롤 되면
        topBtn.classList.add("active");
    } else {
        topBtn.classList.remove("active");
    }
});

const copyButtons = document.querySelectorAll('.txt_box button, .contact_box button');

copyButtons.forEach(button => {
    button.addEventListener('click', (e) => { // e를 추가합니다.
        // [핵심] 이 클릭 이벤트가 부모 섹션(visual 등)으로 퍼지지 않게 차단합니다.
        e.stopPropagation();

        // 현재 클릭된 버튼의 형제 요소인 span에서 이메일 텍스트 추출
        const emailText = button.parentElement.querySelector('span').innerText;
        const btnText = button.querySelector('strong');

        // 클립보드 복사
        navigator.clipboard.writeText(emailText).then(() => {
            // 텍스트 변경
            const originalText = btnText.innerText;
            btnText.innerText = "복사완료!";

            // 2초 후 원상복구
            setTimeout(() => {
                btnText.innerText = originalText;
                button.style.color = "";
            }, 2000);
        }).catch(err => {
            console.error('복사실패:', err);
        });
    });
});


$(".contact_box").hide();

$(".gnb .contact").click(function () {
    const $this = $(this);
    const $box = $(".contact_box");

    // 1. 박스 열고 닫기
    $box.stop().fadeToggle(300);

    // 2. 글자 즉시 교체
    // 현재 글자가 "Contact"라면 "Close"로, 아니면 다시 "Contact"로!
    if ($this.text() === "Contact") {
        $this.text("Close");
    } else {
        $this.text("Contact");
    }
});

$(".mgnb_wrap").hide();
$(".btn_ham").click(function () {
    $(".mgnb_wrap").stop().fadeIn();
    $(this).hide();
    $(".btn_close").show();
});
$(".btn_close").click(function () {
    $(".mgnb_wrap").stop().fadeOut();
    $(this).hide();
    $(".btn_ham").show();
});

const lenis = new Lenis({
    duration: 2,   // 스크롤 한 번에 이동하는 시간 (초). 숫자가 커질수록 천천히 멈춤
    lerp: 0.1,       // 보간법 수치 (0~1). 낮을수록 더 부드럽고 묵직하게 따라옴 (0.05~0.1 추천)
    wheelMultiplier: 0.8, // 마우스 휠 속도 배수. 너무 빠르면 0.8, 느리면 1.2 식으로 조절
    orientation: 'vertical', // 스크롤 방향
    gestureOrientation: 'vertical',
    smoothWheel: true, // 휠 스크롤 부드럽게 사용 여부
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// 페이지 내의 모든 '#' 링크에 Lenis 스크롤 적용
$(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    // 목적지가 있는지 확인 (#만 있는 경우 방지)
    if (target !== "#" && $(target).length > 0) {
        lenis.scrollTo(target, {
            offset: -70, // 헤더 높이만큼 여백 (필요시 조절)
            duration: 1.2
        });
    }

    // 만약 모바일 메뉴(mgnb_wrap) 안의 링크라면 메뉴를 닫아줌
    if ($(this).closest(".mgnb_wrap").length > 0) {
        $(".mgnb_wrap").fadeOut();
        $(".btn_close").hide();
        $(".btn_ham").show();
    }
});



// 2. 스크롤 위치에 따라 버튼 보이기/숨기기
lenis.on('scroll', (e) => {
    // 스크롤이 300px 이상 내려오면 active 클래스 추가
    if (e.scroll > 300) {
        $(".gotop").addClass("active");
    } else {
        $(".gotop").removeClass("active");
    }
});

$(".gotop").click(function () {
    lenis.scrollTo(0, {
        duration: 4, // 올라가는 시간 (초)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // 부드러운 감속
    });
});

const header = document.querySelector('header');
const gotop = document.querySelector('.gotop'); // 추가
const videoBoxes = document.querySelectorAll('.BC_thum, .humming_thum');

videoBoxes.forEach((box) => {
    const video = box.querySelector('.hover_video');

    box.addEventListener('mouseenter', () => {
        if (video) video.play();

        // 헤더와 gotop 페이드 아웃
        header.style.opacity = '0';
        header.style.pointerEvents = 'none';

        if (gotop) {
            gotop.style.opacity = '0'; // 추가
            gotop.style.visibility = 'hidden'; // 추가 (클릭 방지)
        }
    });

    box.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        // 헤더와 gotop 페이드 인
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';

        if (gotop) {
            // 주의: 스크롤 위치가 위쪽일 때는 나타나지 않게 하려면 
            // 기존의 .active 클래스 로직이 있다면 그것을 따르게 하는 것이 좋습니다.
            // 여기서는 단순히 다시 보이게 설정합니다.
            gotop.style.opacity = '';
            gotop.style.visibility = '';
        }
    });
});