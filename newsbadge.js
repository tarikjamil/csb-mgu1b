setTimeout(() => {
  // Your code
  $(".navbar_parent").addClass("topbody");
  $(".annoncement_content-wrapper").addClass("withpopup");
  $(".announcement_parent").addClass("active");
}, 1500);

var numElements = $(".logo-parent").find(".looplogo-item").length;
var randomNum = Math.floor(Math.random() * numElements);
//Select your random element
var logonow = $(".logo-parent").find(
  ".looplogo-item:nth-child(" + randomNum + ")"
);

var numElements2 = $(".flex_icon-scrolling").find(".looplogo-wrapper").length;
var randomNum2 = Math.floor(Math.random() * numElements2);
//Select your random element

var logonow2 = $(".is--looplogo").find(
  ".looplogo-wrapper:nth-child(" + randomNum2 + ")"
);
$(logonow2).appendTo(logonow);
