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
    var wantedProduct = JSON.parse(localStorage.getItem("product"));
    var cartItems = [];

    $(document).ready(function () {

      $("#addToCartBtn").on('click', addToCart);

      function addToCart() {
        var selectedSize = $("#size-drop-text span").text();
        var selectedQuantity = $("#quantity-drop-text span").text();

        if (wantedProduct) {
          var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
          var cartItem = {
            product: wantedProduct,
            size: selectedSize,
            quantity: selectedQuantity
          };

          cartItems.push(cartItem);
          localStorage.setItem('cart', JSON.stringify(cartItems));

          console.log('Product added to cart', wantedProduct);
        }
      }

      var size = Object.keys(wantedProduct.images).length;
      for (let i = 0; i < size + 1; i++) {
        let imageId = "simple-slider-img" + (i + 1);
        $("#simple-slider").append(
          $("<div>").attr("id", imageId).addClass("swiper-slide")
        );
      }
      $('#product-description p').text(wantedProduct.description);
      $('#simple-slider-img1').css('background', 'url(' + wantedProduct.frontImage + ') center center / auto no-repeat').css('background-size', 'contain');
      $('#img-fluid1').find("a").attr("href",wantedProduct.frontImage).attr("target","_blank").find("img").attr("src", wantedProduct.frontImage);

      enterImage("img-fluid");
      enterImage("simple-slider-img");

      function enterImage(labelName) {
        for (let i = 0; i < 4; i++) {
          let imageNum = "image" + (i + 1);
          let imageSrc = wantedProduct.images[imageNum];
          if (imageSrc) {
            if (labelName === "img-fluid") {
              let imageElement = $("#" + labelName + (i + 2));
              imageElement.find("a").attr("href",imageSrc).attr("target","_blank");
              imageElement.find("img").attr("src", imageSrc);
            }
            if (labelName === "simple-slider-img") {
              let imageElement = $("#" + labelName + (i + 2));
              imageElement
                .css("background", "url(" + wantedProduct.images[imageNum] + ") center center / auto no-repeat")
                .css("background-size", "contain");
            }
          }
        }
      }

      wantedProduct.details.forEach((detail) => {
        $('#dropdown-menu-size').append($("<a>").addClass("dropdown-item").attr("role", "presentation").text(detail.size));
      });

      $("#size-drop a").click(function () {
        let selectedSize = $(this).text();
        $("#size-drop-text span").text(selectedSize);
      });

      $("#quantity-drop a").click(function () {
        let selectedQuantity = $(this).text();
        $("#quantity-drop-text span").text(selectedQuantity);
      });

      var swiper = new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

    });
  });
