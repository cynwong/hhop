function animatedScrollCheck() {
  const featureOne = $("#recipe-one");
  const featureTwo = $("#recipe-two");
  const featureThree = $("#recipe-three");

  const windowHeight = $(window).height();

  const features = [featureOne, featureTwo, featureThree];

  features.forEach((feature) => {
    const clientRect = feature[0].getBoundingClientRect();
    // If the element is below the view, fade it out
    if (clientRect.top >= clientRect.height) {
      feature.removeClass("animation");
    } else if (windowHeight - clientRect.top >= clientRect.height / 2) {
      // If the element is half visible, against the bottom box
      feature.addClass("animation");
    }
  });
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

$(document).on("scroll", animatedScrollCheck);
