$(".dropdown_parent").hover(function () {
  $(this).siblings(".navlink").toggleClass("nothover");
  $(this).siblings(".dropdown_parent").toggleClass("nothover");
});

if (screen.width < 992) {
  $(".navlink.hover.colorfont.is--section").click(function () {
    $(".menu_link").click();
  });
}
