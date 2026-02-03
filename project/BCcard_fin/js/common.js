

/* footer */

$(".BC_button").click(function () {
    $(".BC_button").find(".BC").stop().fadeToggle();
});
$(".family_button").click(function () {
    $(".family_button").find(".family").stop().fadeToggle();
});

/* gnb */

$(".gnb > li").hover(function () {
    $(".depth2").stop().fadeToggle();
    $(".depth2_bg").stop().fadeToggle();
    $(".dim").stop().fadeToggle();
});

/* mgnb */

$(".btn_ham").click(function () {
    $(".mgnb_wrap").stop().fadeIn();
    $("body").css({ "overflow": "hidden" });
});
$(".mgnb_close").click(function () {
    $(".mgnb_wrap").stop().fadeOut();
    $("body").css({ "overflow": "auto" });
});

$(".btn_category button").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});

const categoryButtons = document.querySelectorAll('#header .mgnb_wrap .btn_category button');
const menuInner = document.querySelector('#header .mgnb_inner');

// 2. Sticky Header의 수정된 높이를 고정값으로 설정합니다.
const STICKY_HEIGHT = 130;

// 3. 각 버튼에 클릭 이벤트 리스너 추가
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

            // 4. 목표 요소(.mgnb 리스트 항목)의 .mgnb_inner 기준 상단 위치를 측정합니다.
            const targetTop = targetElement.offsetTop;

            // 5. Sticky 높이(130px)만큼 덜 이동하여 최종 스크롤 위치를 계산합니다.
            const scrollToPosition = targetTop - STICKY_HEIGHT;

            // 6. .mgnb_inner 내부 스크롤을 계산된 위치로 부드럽게 이동시킵니다.
            menuInner.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });

            // (추가: 활성화 버튼 스타일링)
            // 현재 활성화된 버튼의 'active' 클래스를 제거하고, 
            // 새로 클릭된 버튼에 'active' 클래스를 추가합니다.
            document.querySelector('.btn_category button.active')?.classList.remove('active');
            button.classList.add('active');
        }
    });
});

// 1. 필요한 요소 선택
const header = document.getElementById('header');
const subMenu = document.querySelector('#header .sub_menu');

// 2. 스크롤 임계값 설정
// 스크롤이 이 값(예: 100px)을 넘으면 헤더에 클래스가 추가됩니다.
const scrollThreshold = 100;

// 3. 스크롤 이벤트 핸들러 정의
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollThreshold) {
        // 🌟 스크롤 시 헤더 전체에 'scrolled' 클래스 추가
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
            subMenu.classList.add('hide'); // .sub_menu 숨기기 유지
        }
    } else {
        // 🌟 스크롤이 되돌아오면 'scrolled' 클래스 제거
        header.classList.remove('scrolled');
        subMenu.classList.remove('hide'); // .sub_menu 보이기 유지
    }
});