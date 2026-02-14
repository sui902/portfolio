$(".gnb > li").mouseenter(function () {
    $("#header").addClass("active");
    $(this).find(".depth2").show();
    $(".pop_search").stop().fadeOut();
});
$(".gnb > li").mouseleave(function () {
    $("#header").removeClass("active");
    $(this).find(".depth2").hide();
});


$(".btn_search").click(function () {
    $(".pop_search").stop().slideToggle();
    $(".m_search").hide();
    $(".m_close").show()
});
$(".btn_pop_close").click(function () {
    $(".pop_search").slideUp();
    $(".m_close").hide();
    $(".m_search").show();
});

$(".m_search").click(function () {
    $(this).hide();
    $(".m_close").show();
    $(".pop_search").stop().slideDown();

});
$(".m_close").click(function () {
    $(this).hide();
    $(".m_search").show();
    $(".pop_search").stop().slideUp();
});

$(".btn_ham").click(function () {
    $(".mgnb_wrap").stop().fadeIn();
    $(".dim").stop().fadeIn();
    $("body").css({ "overflow": "hidden" });
});

$(".close_mgnb").click(function () {
    $(".mgnb_wrap").stop().fadeOut();
    $(".dim").stop().fadeOut();
    $("body").css({ "overflow": "auto" });
});

