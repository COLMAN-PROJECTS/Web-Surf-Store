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

    $(document).ready(function () {
      // Size dropdown
      $("#size-drop a").click(function () {
        let selectedSize = $(this).text();
        $("#size-drop-text span").text(selectedSize);
      });

      // Quantity dropdown
      $("#quantity-drop a").click(function () {
        let selectedQuantity = $(this).text();
        $("#quantity-drop-text span").text(selectedQuantity);
      });

      // Add to cart button click event
      $("#addToCartBtn").click(function () {
        var selectedSize = $(".size-dropdown .x-drop-btn span").text();
        var selectedQuantity = $(".quantity-dropdown .x-drop-btn span").text();
        addToCart(selectedSize, selectedQuantity);
      });

      // Function to handle adding to cart
      function addToCart(size, quantity) {
        // Perform actions with the selected size and quantity
        console.log("Selected size:", size);
        console.log("Selected quantity:", quantity);
        // You can pass the selected size and quantity to another function or store them in variables, etc.
      }

      var size = Object.keys(wantedProduct.images).length;
      for (let i = 0; i < size + 1; i++) {
        let imageId = "simple-slider-img" + (i + 1);
        $("#simple-slider").append(
          $("<div>").attr("id", imageId).addClass("swiper-slide")
        );
      }

      $('#simple-slider-img1').css('background', 'url(' + wantedProduct.frontImage + ') center center / auto no-repeat').css('background-size', 'contain');
      $('#img-fluid1').find("img").attr("src", wantedProduct.frontImage);

      enterImage("img-fluid");
      enterImage("simple-slider-img");

      function enterImage(labelName) {
        for (let i = 1; i <= 4; i++) {
          let imageNum = "image" + i;
          let imageSrc = wantedProduct.images[imageNum];
          if (imageSrc) {
            if (labelName === "img-fluid") {
              let imageElement = $("#" + labelName + (i + 1));
              imageElement.find("img").attr("src", imageSrc);
            }
            if (labelName === "simple-slider-img") {
              let imageElement = $("#" + labelName + (i + 1));
              imageElement
                .css("background", "url(" + wantedProduct.images[imageNum] + ") center center / auto no-repeat")
                .css("background-size", "contain");
            }
          }
        }
      }

      // Initialize Swiper slider
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
