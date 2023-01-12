$(window).on("load", function () {
  // your code here

  $(".newsroom--2column").closest("h2").addClass("columns-selector");
  $(".newsroom--2column")
    .closest("h2")
    .siblings("figure")
    .next()
    .addClass("columns-selectorlast");

  var split_at = ".columns-selector";
  $(split_at).each(function () {
    $(this)
      .add($(this).nextUntil(".columns-selectorlast"))
      .wrapAll("<div class='grid_2els _1el_tablet is--122gap'/>");
  });

  var seconddiv = ".columns-selector";
  $(seconddiv).each(function () {
    $(this).add($(this).nextUntil("figure")).wrapAll("<div class='divclass'/>");
  });

  //for hightlights
  $(".newsroom--highlight").closest("h2").addClass("theselector-highlight");
  $(".newsroom--highlight")
    .closest("h2")
    .siblings("h3")
    .next()
    .next()
    .addClass("thepoint-p");

  var split_at3 = ".theselector-highlight";
  $(split_at3).each(function () {
    $(this)
      .add($(this).nextUntil(".theselector-highlight"))
      .wrapAll("<div class='grid_2els _1el_tablet is--122gap'/>");
  });

  var split_at2 = "h3";
  $(split_at2).each(function () {
    $(this)
      .add($(this).nextUntil(".thepoint-p"))
      .wrapAll("<div class='highlight-element'/>");
  });

  $(".thepoint-p").prev().addClass("theselector-highlight-last");

  var split_at4 = ".theselector-highlight";
  $(split_at4).each(function () {
    $(this)
      .add($(this).nextUntil(".thepoint-p"))
      .wrapAll("<div class='divclass'/>");
  });

  $("figure.thepoint-p").addClass("image_phonemask");
  $("figure.thepoint-p").wrap("<div class='mask'/>");
  $(".mask").wrap("<div class='phone_parent client_highlight'/>");

  // is event
  $(".newsroom-event-title").closest("h2").addClass("h_32 is--16margin-bottom");
  $(".newsroom-event-title")
    .closest("._976_container")
    .removeClass("_976_container")
    .addClass("_1176_container");
  $(".newsroom-event-title")
    .closest("h2")
    .prev()
    .addClass("event-time h_24 is--tablet");
  $(".newsroom-event-title").closest("h2").next().addClass("event_richtext");
  $(".event-time").wrap("<div class='event_circle'/>");
  $(".event_richtext").after("<div class='line_3px second'/>");
  $(".event_richtext").after("<div class='line_3px first'/>");

  var event_split = ".h_32.is--16margin-bottom";
  $(event_split).each(function () {
    $(this)
      .add($(this).nextUntil(".line_3px.first"))
      .wrapAll("<div class='_20padding'/>");
  });

  var event_split2 = ".event_circle";
  $(event_split2).each(function () {
    $(this)
      .add($(this).nextUntil(".event_circle"))
      .wrapAll("<div class='grid_event'/>");
  });
});
