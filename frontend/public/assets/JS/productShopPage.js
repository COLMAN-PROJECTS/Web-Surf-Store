window.innerWidth < 768 && [].slice.call(document.querySelectorAll("[data-bss-disabled-mobile]")).forEach((function (e) {
  e.classList.remove("animated"), e.removeAttribute("data-bss-hover-animate"), e.removeAttribute("data-aos"), e.removeAttribute("data-bss-parallax-bg"), e.removeAttribute("data-bss-scroll-zoom")
})), document.addEventListener("DOMContentLoaded", (function () {
  !function () {
    if ("requestAnimationFrame" in window) {
      var e = [], t = new WeakMap, o = document.querySelectorAll("[data-bss-scroll-zoom]");
      for (var n of o) {
        var a = document.createElement("div");
        a.style.backgroundImage = n.style.backgroundImage, a.style.backgroundSize = "cover", a.style.backgroundPosition = "center", a.style.position = "absolute", a.style.height = "100%", a.style.width = "100%", a.style.top = 0, a.style.left = 0, a.style.zIndex = -100, n.appendChild(a), e.push(a), t.set(a, n.getAttribute("data-bss-scroll-zoom-speed") || 1), n.style.position = "relative", n.style.background = "transparent", n.style.overflow = "hidden"
      }
      if (e.length) {
        var r, i = [];
        window.addEventListener("scroll", s), window.addEventListener("resize", s), s()
      }
    }

    function s() {
      i.length = 0;
      for (var o = 0; o < e.length; o++) {
        var n = e[o].parentNode.getBoundingClientRect();
        n.bottom > 0 && n.top < window.innerHeight && i.push({rect: n, node: e[o], speed: t.get(e[o])})
      }
      cancelAnimationFrame(r), i.length && (r = requestAnimationFrame(l))
    }

    function l() {
      for (var e = 0; e < i.length; e++) {
        var t = i[e].rect, o = i[e].node, n = i[e].speed, a = t.top < 0 ? Math.abs(t.top) / t.height : 0;
        o.style.transform = "scale3d(" + (1 + a * n) + ", " + (1 + a * n) + ", 1)"
      }
    }

    $(document).ready(function () {
      let imageUrl = 'assets/images/productShop/sup-head.jpeg';
      let backgroundImage = 'url(' + imageUrl + ') center / cover';

      $('#titleImage').css('background', backgroundImage);
      $("#titleH1").text('Discover, Shop, and Surf the Best');
    })

 $(document).ready((function () {
      $("#list").click((function (e) {
        e.preventDefault(), $("#products .item").addClass("list-group-item")
      })), $("#grid").click((function (e) {
        e.preventDefault(), $("#products .item").removeClass("list-group-item"), $("#products .item").addClass("grid-group-item")
      }))
    }));


  }()
}), !1);
