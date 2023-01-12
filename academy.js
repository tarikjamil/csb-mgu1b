function passwordFunction() {
  var x = document.getElementById("passwordis");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

var variable;

//form inputs animation
$(".hs-input").focus(function () {
  $(this)
    .siblings(".password_label-wrapper")
    .find(".password_field-label")
    .addClass("active");
});
$(".password_field").focusout(function () {
  variable = $(this).val().length;
  if (variable < 1) {
    $(this)
      .siblings(".password_label-wrapper")
      .find(".password_field-label")
      .removeClass("active");
  }
});
