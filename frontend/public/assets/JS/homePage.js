window.innerWidth < 768 && [].slice.call(document.querySelectorAll("[data-bss-disabled-mobile]")).forEach((function (e) {
  e.classList.remove("animated"), e.removeAttribute("data-bss-hover-animate"), e.removeAttribute("data-aos"), e.removeAttribute("data-bss-parallax-bg"), e.removeAttribute("data-bss-scroll-zoom")
})), document.addEventListener("DOMContentLoaded", (function () {
  !function () {
    if ("requestAnimationFrame" in window) {
      var e = [], t = new WeakMap, o = document.querySelectorAll("[data-bss-scroll-zoom]");
      for (let n of o) {
        let a = document.createElement("div");
        a.style.backgroundImage = n.style.backgroundImage, a.style.backgroundSize = "cover", a.style.backgroundPosition = "center", a.style.position = "absolute", a.style.height = "100%", a.style.width = "100%", a.style.top = 0, a.style.left = 0, a.style.zIndex = -100, n.appendChild(a), e.push(a), t.set(a, n.getAttribute("data-bss-scroll-zoom-speed") || 1), n.style.position = "relative", n.style.background = "transparent", n.style.overflow = "hidden"
      }
      if (e.length) {
        var r, s = [];
        window.addEventListener("scroll", i), window.addEventListener("resize", i), i()
      }
    }

    function i() {
      s.length = 0;
      for (let o = 0; o < e.length; o++) {
        let n = e[o].parentNode.getBoundingClientRect();
        n.bottom > 0 && n.top < window.innerHeight && s.push({rect: n, node: e[o], speed: t.get(e[o])})
      }
      cancelAnimationFrame(r), s.length && (r = requestAnimationFrame(l))
    }

    function l() {
      for (let e = 0; e < s.length; e++) {
        let t = s[e].rect, o = s[e].node, n = s[e].speed, a = t.top < 0 ? Math.abs(t.top) / t.height : 0;
        o.style.transform = "scale3d(" + (1 + a * n) + ", " + (1 + a * n) + ", 1)"
      }
    }

    $(document).ready(function () {
      let imageUrl = 'public/assets/images/homePage/imageTitelHomePage.webp';
      let backgroundImage = 'url(' + imageUrl + ') center / cover';

      $('#titleImage').css('background', backgroundImage);
      $("#titleH1").text('Discover, Shop, and Surf the Best');
    });

    $(document).ready(function () {
      $('#bestOffers h1').text('Our Best Offers');
      $.ajax({
        url: '/frontend/DB/ProductSeed.json',
        dataType: 'json',
        success: function (product) {
          for (let j = 0; j < 3; j++) {
            let productImageId = '#bestOffersImg' + (j + 1);
            let productPId = '#bestOffersP' + (j + 1);

            $(productImageId + ' img').attr('src', product[j].frontImage);
            $(productPId).html(product[j].name + "<br>" + product[j].price + "$");
          }
        }
      })
    });

  }()
}), !1);

