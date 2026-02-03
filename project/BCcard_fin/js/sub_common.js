
let timeInSeconds = 600;

// 타이머 표시 요소를 가져옵니다.
const timerElement = document.getElementById('timeDisplay');

// 2. 시간 표시를 업데이트하는 함수
function updateTimer() {
    // 분과 초를 계산합니다.
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    // 분과 초가 한 자리 숫자일 경우 앞에 '0'을 붙여 두 자리로 만듭니다. (예: 9 -> 09)
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    // 화면에 시간을 표시합니다.
    timerElement.innerHTML = `${displayMinutes}:${displaySeconds}`;
    // 

    // 3. 남은 시간을 1초 감소시킵니다.
    timeInSeconds--;

    // 4. 타이머 종료 처리
    if (timeInSeconds < 0) {
        clearInterval(timerInterval); // 타이머 멈춤
        timerElement.innerHTML = "시간 초과"; // 종료 메시지

        // 여기에 **시간이 초과되었을 때 실행할 작업**을 추가할 수 있습니다.
        // 예: alert("세션 만료"), location.href = "로그아웃페이지.html" 등
    }
}

// 5. 페이지 로드 시 타이머 시작 (1000ms = 1초마다 updateTimer 함수 실행)
// 'window.onload'나 DOMContentLoaded 이벤트가 발생했을 때 이 코드를 실행하는 것이 좋습니다.
const timerInterval = setInterval(updateTimer, 1000);

// 초기 화면에 '10:00'을 바로 표시하기 위해 한 번 호출합니다.
// (setInterval이 1초 후에 첫 실행이 되므로, 초기값을 바로 보여주기 위함)
updateTimer();

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


