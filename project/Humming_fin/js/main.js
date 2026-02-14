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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
})

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

$(document).ready(function () {

    // 1. 드롭다운 토글 기능 구현 (열기/닫기)
    $('.dropdown-toggle').on('click', function () {
        // 현재 클릭된 토글의 부모 컨테이너 (.location, .course 등)
        const $parentDrop = $(this).closest('.drop > div');
        // 현재 메뉴 목록
        const $currentMenu = $parentDrop.find('.d_menu');

        // 현재 메뉴의 열림 상태 확인
        const isOpen = $parentDrop.hasClass('open');

        // 다른 모든 드롭다운 닫기 (open 클래스 제거 및 메뉴 숨기기)
        $('.drop > div').removeClass('open');
        $('.d_menu').hide();

        // 현재 드롭다운 열거나 닫기
        if (!isOpen) {
            $parentDrop.addClass('open');
            // .d_menu를 즉시 표시 (show)
            $currentMenu.show();
        } else {
            // 닫는 경우
            $parentDrop.removeClass('open');
            $currentMenu.hide();
        }
    });

    // 2. 선택 값 변경 및 메뉴 닫기 기능 구현
    $('.d_menu li').on('click', function () {
        const selectedText = $(this).text();

        // 상위 컨테이너와 토글 요소 찾기
        const $parentDrop = $(this).closest('.drop > div');
        const $toggleElement = $parentDrop.find('.dropdown-toggle');

        // 토글 버튼 텍스트 변경
        $toggleElement.text(selectedText);

        // 메뉴 닫기 (open 클래스 제거 및 hide)
        $parentDrop.removeClass('open');
        $parentDrop.find('.d_menu').hide();
    });

    // 3. 외부 클릭 시 드롭다운 닫기
    $(document).on('click', function (e) {
        // 클릭된 요소가 .drop 컨테이너 내부가 아닌지 확인
        if (!$(e.target).closest('.drop').length) {
            $('.drop > div').removeClass('open');
            $('.d_menu').hide();
        }
    });

    // 4. 라디오 버튼 기능 구현
    $('.radio li').on('click', function () {
        // 같은 ul 내의 모든 li에서 active 클래스 제거
        $(this).siblings().removeClass('active');

        // 클릭된 항목에만 active 클래스 추가
        $(this).addClass('active');
    });
});

const review_list01 = new Swiper(".review_list01", {
    slidesPerView: 1.2,
    centeredSldies: true,
    breakpoints: {
        400: {
            slidesPerView: 1.5,
        },
        600: {
            slidesPerView: 2,
        },
        800: {
            slidesPerView: 2.5,
        },
        1000: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
        1500: {
            slidesPerView: 5,
        },
        1800: {
            slidesPerView: 6,
        },
    },
    loop: true,
    speed: 8000,
    autoplay: {
        delay: 0,
    },
})

$(".loc_info > div:not(:nth-of-type(3))").hide();
$(".loc_btn button").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    let idx = $(this).index();
    $(".loc_info > div").eq(idx).fadeIn().siblings().hide();
});

document.addEventListener('DOMContentLoaded', () => {
    // 모든 커스텀 드롭다운 컨테이너(.select_01, .select_02 등)를 선택
    const customSelects = document.querySelectorAll('.select_01, .select_02');

    customSelects.forEach(selectContainer => {
        // 요소 선택
        const toggle = selectContainer.querySelector('.toggle');
        const menu = selectContainer.querySelector('.d_menu_02');
        const hiddenInput = selectContainer.querySelector('input[type="hidden"]');

        // --- 1. 토글 기능: 클릭 시 목록 열고 닫기 ---
        toggle.addEventListener('click', () => {

            // 다른 드롭다운이 열려 있으면 닫기
            customSelects.forEach(otherSelect => {
                if (otherSelect !== selectContainer) {
                    const otherMenu = otherSelect.querySelector('.d_menu_02');
                    const otherToggle = otherSelect.querySelector('.toggle');

                    // 다른 메뉴 닫기 및 active 클래스 제거
                    if (otherMenu.classList.contains('open')) {
                        otherMenu.classList.remove('open');
                        otherToggle.classList.remove('active');
                    }
                }
            });

            // 현재 드롭다운 메뉴와 토글 상태 토글
            menu.classList.toggle('open');
            toggle.classList.toggle('active');

            // (선택 사항) 메뉴가 열릴 때 첫 번째 항목에 포커스를 줍니다. (접근성 향상)
            if (menu.classList.contains('open')) {
                menu.querySelector('li').focus();
            }
        });

        // --- 2. 항목 선택 기능: li 클릭 시 값 반영 ---
        menu.querySelectorAll('li').forEach(item => {
            // 접근성을 위해 tabindex 추가 (CSS에서 포커스 스타일링 필요)
            item.setAttribute('tabindex', '0');

            const selectItem = (e) => {
                const selectedText = e.target.textContent;
                const selectedValue = e.target.getAttribute('data-value');

                // 1. toggle 텍스트 업데이트 (화면 표시)
                toggle.textContent = selectedText;

                // 2. hidden input 값 업데이트 (폼 전송 데이터)
                hiddenInput.value = selectedValue;

                // 3. 드롭다운 닫기
                menu.classList.remove('open');
                toggle.classList.remove('active');

                // 4. 토글 버튼에 다시 포커스
                toggle.focus();
            };

            // 마우스 클릭 이벤트
            item.addEventListener('click', selectItem);

            // 키보드 이벤트 (Enter, Space 키)
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // 스크롤 등 기본 동작 방지
                    selectItem(e);
                }
            });
        });

        // --- 3. 외부 영역 클릭 시 드롭다운 닫기 ---
        document.addEventListener('click', (e) => {
            // 클릭된 요소가 현재 드롭다운 컨테이너 안에 없으면 닫기
            if (!selectContainer.contains(e.target)) {
                // 메뉴가 열려있을 때만 닫기
                if (menu.classList.contains('open')) {
                    menu.classList.remove('open');
                    toggle.classList.remove('active'); // ⭐ active 클래스 함께 해제
                }
            }
        });
    });
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