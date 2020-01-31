function animation(itemOne, itemTwo, itemThree) {
  $(itemOne).addClass("animation");
  $(itemTwo).removeClass("animation");
  $(itemThree).removeClass("animation");
}

function scroll() {
  const scrollTop = $(document).scrollTop();
  if (scrollTop < 300) {
    $("nav").css("opacity", 1);
  } else if (scrollTop < 900 && scrollTop > 301) {
    $("nav").css("opacity", 0.9);
    animation("#recipe-one", "#recipe-two", "#recipe-three");
  } else if (scrollTop < 1400 && scrollTop > 901) {
    $("nav").css("opacity", 0.9);
    animation("#recipe-two", "#recipe-one", "#recipe-three");
  } else if (scrollTop > 1401) {
    $("nav").css("opacity", 0.9);
    animation("#recipe-three", "#recipe-one", "#recipe-two");
  }
}

$(".js-back-to-top").on("click", () => {
  $("html, body").animate({
    scrollTop: 0,
  });
});

// for the scroll button in the page bottom
$(document).scroll(() => {
  if ($(document).scrollTop() > 1800) {
    $(".js-back-to-top").show();
  } else {
    $(".js-back-to-top").hide();
  }
});

$(document).on("scroll", scroll);
