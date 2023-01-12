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

// slider
document.addEventListener("DOMContentLoaded", function () {
  let splide = new Splide(".slider1", {
    type: "slider",
    perPage: 3,
    perMove: 1,
    gap: "8rem",
    breakpoints: {
      991: {
        // Tablet
        perPage: 1,
        arrows: false
      },
      767: {
        // Mobile Landscape
        perPage: 1,
        arrows: false
      },
      479: {
        // Mobile Portrait
        perPage: 1,
        arrows: false
      }
    }
  });
  splide.mount();
});

var splide2 = new Splide(".slider2");
var bar = splide2.root.querySelector(".progressbar-inside");

// Update the bar width:
splide2.on("mounted move", function () {
  var end = splide2.Components.Controller.getEnd() + 1;
  bar.style.width = String((100 * (splide2.index + 1)) / end) + "%";
});

splide2.mount();

// slider testimonial
function slider2() {
  let splides = $(".slider2");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      // Desktop on down
      perPage: 1,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: "slide", // 'loop' or 'slide'
      gap: "24em", // space between slides
      arrows: "slider", // 'slider' or false
      pagination: false, // 'slider' or false
      speed: 600, // transition speed in miliseconds
      dragAngleThreshold: 30, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false, // true removes empty space from end of list
      breakpoints: {
        991: {
          // Tablet
          perPage: 1
        },
        767: {
          // Mobile Landscape
          perPage: 1
        },
        479: {
          // Mobile Portrait
          perPage: 1
        }
      }
    }).mount();
  }
}
slider2();
