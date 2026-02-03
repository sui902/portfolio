
// 이벤트에 사용할 네임스페이스를 정의합니다. 
// (이 네임스페이스를 통해 다른 jQuery 이벤트와 섞이지 않게 이 이벤트만 제어할 수 있습니다.)
const EVENT_NAMESPACE = ".cardHoverDesktop";

// 1. 마우스 이벤트를 등록하는 함수
function activateHoverEvents() {
    // on() 메서드와 네임스페이스를 사용하여 이벤트를 바인딩합니다.
    $(".card_img").on("mouseenter" + EVENT_NAMESPACE, function () {
        $(this).find("img").toggleClass("active");
        $(this).find(".hide_info").stop().delay(200).fadeIn();
    });

    $(".card_img").on("mouseleave" + EVENT_NAMESPACE, function () {
        $(this).find("img").toggleClass("active");
        $(this).find(".hide_info").stop().fadeOut(100);
    });

    console.log("마우스 오버 이벤트 활성화됨 (1251px 이상).");
}

// 2. 마우스 이벤트를 제거하고 상태를 초기화하는 함수
function deactivateHoverEvents() {
    // off() 메서드에 네임스페이스만 전달하여 해당 이벤트들만 제거합니다.
    $(".card_img").off(EVENT_NAMESPACE);

    // 해상도가 줄어들 때 잔여 효과를 제거하기 위해 상태를 리셋합니다.
    $(".card_img").find("img").removeClass("active");
    $(".card_img").find(".hide_info").css("display", "none").stop();

    console.log("마우스 오버 이벤트 비활성화됨 (1250px 이하).");
}

// --- 해상도 제어 로직 ---

// 1250px보다 커야 실행되므로, 기준점을 1251px로 설정합니다.
const breakpoint = 1251;
const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

// 해상도 변경에 따라 기능을 제어하는 메인 핸들러 함수
function handleHoverFeature(e) {
    if (e.matches) {
        // 조건 충족: 뷰포트 너비가 1251px 이상일 때 (데스크톱)
        activateHoverEvents();
    } else {
        // 조건 불충족: 뷰포트 너비가 1250px 이하일 때 (모바일/태블릿)
        deactivateHoverEvents();
    }
}

// 문서 로드 및 해상도 변경 리스너 설정
$(document).ready(function () {
    // 1. 초기 로드 시 한 번 실행
    handleHoverFeature(mediaQuery);

    // 2. 뷰포트 크기가 변경될 때마다 핸들러 함수 실행
    mediaQuery.addEventListener('change', handleHoverFeature);
});

const card_list = new Swiper(".card_list", {
    spaceBetween: 240,
    navigation: {
        nextEl: ".combine-next",
        prevEl: ".combine-prev",
    },
});

const event_list = new Swiper(".event_list", {
    speed: 1000,
    navigation: {
        nextEl: ".event-next",
        prevEl: ".event-prev",
    },
})  