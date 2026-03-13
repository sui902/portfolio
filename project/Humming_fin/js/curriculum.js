$(".category_down").hide();
$(".default").click(function () {
  $(".category_down").stop().fadeIn();
});
$(".category_down > li:first-child").click(function () {
  $(".category_down").stop().fadeOut();
});

$(".search_interaction .filter > div h2").click(function () {
  $(this).toggleClass("active");
  $(this).next(".radio-container").stop().toggle();
});

$(".pop_close").click(function () {
  $(".popup").hide();
});
$(".today_close").click(function () {
  $(".popup").hide();
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