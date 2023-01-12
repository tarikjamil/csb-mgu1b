$(".info-icon").on("mouseenter", function () {
  $(this).siblings(".bubble_pricing").toggleClass("is--active");
});

$(".bubble_pricing").on("mouseleave", function () {
  $(this).toggleClass("is--active");
});
