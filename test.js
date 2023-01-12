$(".plus-accordion-trigger").click(function () {
  var we_clicks = $(this).data("we_clicks");
  if (!we_clicks) {
    $(".lastclicked").trigger("click");
    $(this).parent(".plus-accordion-el").addClass("lastclicked");
    $(this).attr("href", function () {
      return $(this).attr("datasrc");
    });
    $(this)
      .parent(".service--accordion-wrapper")
      .siblings(".service--accordion-wrapper")
      .find(".plus-accordion-el")
      .attr("href", function () {
        return $(this)
          .parent(".service--accordion-wrapper")
          .siblings(".service--accordion-wrapper")
          .find(".plus-accordion-el")
          .attr("datasrc");
      });
  } else {
    $(this).attr("href", "#services");
    $(this).parent(".plus-accordion-el").removeClass("lastclicked");
  }
  $(this).data("we_clicks", !we_clicks);
});
