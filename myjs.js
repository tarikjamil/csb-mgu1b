$(document).ready(function () {
  $("#myVideo").get(0).play();
});

// Play animation when scrolled into view
$(".scroll_into").one("inview", function (event, isInView) {
  if (isInView) {
    $(".scroll_into").each(function (i) {
      var $item = $(this);
      setTimeout(function () {
        $item.click();
      }, 100 * i);
      // delays the next animation by 200 milliseconds
    });
  } else {
  }
});

// when document is fully loaded, progress bar
$(document).ready(function () {
  var calc = 33;
  var $slider = $(".list_testimonials");
  var $progressBar = $(".progress");
  var $progressBarLabel = $(".slider__label");

  $(".list_testimonials").on("init", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    var calc = (1 / slick.slideCount) * 100;

    $progressBar
      .css("background-size", calc + "% 100%")
      .attr("aria-valuenow", calc);

    $progressBarLabel.text(calc + "% completed");
  });

  $(".list_testimonials").on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    var calc = ((nextSlide + 1) / slick.slideCount) * 100;

    $progressBar
      .css("background-size", calc + "% 100%")
      .attr("aria-valuenow", calc);

    $progressBarLabel.text(calc + "% completed");
  });

  //slick slides
  $(".list").slick({
    dots: false,
    speed: 400,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchThreshold: 300,
    swipe: false,
    prevArrow: $(".slider-prev"),
    nextArrow: $(".slider-next"),
    responsive: [
      {
        // desktop smaller then 1644
        breakpoint: 1644,
        settings: {
          slidesToShow: 3,
          swipe: true
        }
      },
      {
        // tablet
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          swipe: true
        }
      },
      {
        // mobile portrait
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          swipe: true
        }
      }
    ]
  });

  $(".list_testimonials").slick({
    dots: false,
    speed: 400,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    touchThreshold: 300,
    prevArrow: $(".slider--prev"),
    nextArrow: $(".slider--next"),
    responsive: [
      {
        // tablet
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          swipe: true
        }
      },
      {
        // mobile portrait
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          swipe: true
        }
      }
    ]
  });

  $(".list_testimonials2").slick({
    dots: false,
    speed: 400,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: false,
    touchThreshold: 300,
    prevArrow: $(".slider--prev"),
    nextArrow: $(".slider--next"),
    responsive: [
      {
        // tablet
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          swipe: true
        }
      },
      {
        // mobile portrait
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          swipe: true
        }
      }
    ]
  });

  $(".slider-prev").click(function () {
    $(this).closest(".section").find(".list").slick("slickPrev");
  });

  $(".slider-next").click(function () {
    $(this).closest(".section").find(".list").slick("slickNext");
  });

  $(".slider--prev").click(function () {
    $(this).closest(".section").find(".list_testimonials").slick("slickPrev");
  });

  $(".slider--next").click(function () {
    $(this).closest(".section").find(".list_testimonials").slick("slickNext");
  });
});

//slider indicator

function moveLine(myLine) {
  var myDistance = myLine.offset().left - $(".slick-dots li").offset().left;
  var myWidth = myLine.width();

  $(".indicator_line").css({
    width: myWidth + "px",
    transform: "translateX(" + myDistance + "px)"
  });
}

if ($(".slick-dots li.slick-active").length > 0) {
  moveLine($(".slick-dots li.slick-active"));
}

window.onresize = function () {
  if ($(".slick-dots li.slick-active").length > 0) {
    moveLine($(".slick-dots li.slick-active"));
  }
};

// color change
ScrollTrigger.matchMedia({
  "(min-width: 992px)": function () {
    gsap.utils.toArray(".color").forEach(function (elem) {
      var color = elem.getAttribute("data-color");
      var datafont = elem.getAttribute("data-font");

      ScrollTrigger.create({
        trigger: elem,
        start: "top 1%",
        end: "bottom top",
        duration: 0.2,
        onEnter: () => gsap.to(".body", { backgroundColor: color }),
        onLeave: () => gsap.to(".body", { backgroundColor: "white" }),
        onLeaveBack: () => gsap.to(".body", { backgroundColor: "white" }),
        onEnterBack: () => gsap.to(".body", { backgroundColor: color }),
        markers: false
      });

      ScrollTrigger.create({
        trigger: elem,
        start: "top 1%",
        end: "bottom top",
        duration: 0.1,
        onEnter: () =>
          gsap.to(".body , .colorfont", {
            color: datafont,
            borderColor: datafont
          }),
        onLeave: () =>
          gsap.to(".body , .colorfont", {
            color: "#2a2a2a",
            borderColor: "#2a2a2a"
          }),
        onLeaveBack: () =>
          gsap.to(".body , .colorfont", {
            color: "#2a2a2a",
            borderColor: "#2a2a2a"
          }),
        onEnterBack: () =>
          gsap.to(".body , .colorfont", {
            color: datafont,
            borderColor: datafont
          }),
        markers: false
      });

      ScrollTrigger.create({
        trigger: elem,
        start: "top 1%",
        end: "bottom top",
        duration: 0.1,
        onEnter: () => gsap.to(".colorchange_btn", { opacity: "0" }),
        onLeave: () => gsap.to(".colorchange_btn", { opacity: "1" }),
        onLeaveBack: () => gsap.to(".colorchange_btn", { opacity: "1" }),
        onEnterBack: () => gsap.to(".colorchange_btn", { opacity: "0" }),
        markers: false
      });
    });
  }
});

$(".slick-dots").wrap('<div class="slick_dots-wrapper"></div>');
$(".slick_dots-wrapper").append('<div class="indicator_line"></div>');

//top video hover
$(".topvideo_hero").hover(function () {
  $(this).find(".play_btn-hero").toggleClass("bigger");
});

//slider shows hover
$(".show_link").hover(function () {
  $(this).find(".play_btn-hero").toggleClass("bigger");
});

//newsroom hover
$(".customer_img").hover(function () {
  $(this).toggleClass("hover_in");
  $(this).siblings(".case_study-text").toggleClass("hover_in");
});

//nav hover
$(".hover").hover(function () {
  $(".hover").not(this).toggleClass("nothover");
});

//btn hover color swap
$(".relative_for-hover").hover(function () {
  $(this).find("div").toggleClass("hover_el");
});
