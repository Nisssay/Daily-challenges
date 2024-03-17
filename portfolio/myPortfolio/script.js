$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "yassine Lajnaoudi";
  } else {
    document.title = "Come Back To Portfolio";
  }
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["frontend development", "backend development", "web development"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});

// // disable developer mode
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }

// /* ===== SCROLL REVEAL ANIMATION ===== */
// const srtop = ScrollReveal({
//   origin: "top",
//   distance: "80px",
//   duration: 1000,
//   reset: true,
// });

// /* SCROLL HOME */
// srtop.reveal(".home .content h3", { delay: 200 });
// srtop.reveal(".home .content p", { delay: 200 });
// srtop.reveal(".home .content .btn", { delay: 200 });

// srtop.reveal(".home .image", { delay: 400 });
// srtop.reveal(".home .linkedin", { interval: 600 });
// srtop.reveal(".home .github", { interval: 800 });
// srtop.reveal(".home .facebook", { interval: 600 });
// srtop.reveal(".home .instagram", { interval: 600 });

// /* SCROLL ABOUT */
// srtop.reveal(".about .content h3", { delay: 200 });
// srtop.reveal(".about .content .tag", { delay: 200 });
// srtop.reveal(".about .content p", { delay: 200 });
// srtop.reveal(".about .content .box-container", { delay: 200 });
// srtop.reveal(".about .content .resumebtn", { delay: 200 });

// /* SCROLL SKILLS */
// srtop.reveal(".skills .container", { interval: 200 });
// srtop.reveal(".skills .container .bar", { delay: 400 });

// /* SCROLL EDUCATION */
// srtop.reveal(".education .box", { interval: 200 });

// /* SCROLL PROJECTS */
// srtop.reveal(".work .box", { interval: 200 });

// /* SCROLL CONTACT */
// srtop.reveal(".contact .container", { delay: 400 });
// srtop.reveal(".contact .container .form-group", { delay: 400 });
