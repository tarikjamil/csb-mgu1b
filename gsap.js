ScrollTrigger.matchMedia({
  function() {
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
