window.innerWidth < 768 &&
[].slice
  .call(document.querySelectorAll("[data-bss-disabled-mobile]"))
  .forEach(function (e) {
    e.classList.remove("animated"),
      e.removeAttribute("data-bss-hover-animate"),
      e.removeAttribute("data-aos"),
      e.removeAttribute("data-bss-parallax-bg"),
      e.removeAttribute("data-bss-scroll-zoom");
  }),
  document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
      let imageUrl = 'assets/images/beachInfo/beach-info-up.jpeg';
      let backgroundImage = 'url(' + imageUrl + ') center / cover';

      $('#titleImage').css('background', backgroundImage);
      $("#titleH1").text('Discover, Shop, and Surf the Best');
    });

  });
