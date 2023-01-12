$("input[type='radio']").click(function () {
  $(this).closest(".filter_wrapper").find(".filter_btn").click();
});

$(".close_menu").click(function () {
  $(this).closest(".filter_wrapper").find(".filter_btn").click();
});

$(".filter_btn").click(function () {
  if ($(this).find(".inline_block").text().length > 0) {
    $(this).siblings(".label_field").addClass("focus");
  }
});

$(".filter_dropdown-itemlink").click(function () {
  $(this).closest(".filter_wrapper").find(".filter_btn").click();
  var str = $(this).find(".inline_block").text();
  $(this)
    .closest(".filter_wrapper")
    .find(".filter_btn")
    .find(".inline_block")
    .text(str);
});
