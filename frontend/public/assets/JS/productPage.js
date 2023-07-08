
    var wantedProduct = JSON.parse(localStorage.getItem("product"));
    var cartItems = [];

    $(document).ready(function () {
      btnOrganized();
      updateCartIcon();

      $("#addToCartBtn").on('click', addToCart);

      function addToCart() {
        if (localStorage.getItem('user')) {
          var selectedSize = $("#size-drop-text span").text();
          var selectedQuantity = $("#quantity-drop-text span").text();

          if (wantedProduct && selectedSize !== 'Size' && selectedQuantity !== 'Quantity') {
            var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            var cartItem = {
              product: wantedProduct,
              size: selectedSize,
              quantity: selectedQuantity
            };

            cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartIcon();
            showPopupMessage('Product added to cart');

            console.log('Product added to cart', wantedProduct);
          } else {
            showPopupMessage('Please select size and quantity');
          }
        } else {
          showPopupMessage('Please login to add product to cart');
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
      $('#product-price').text(wantedProduct.price + " $");
      $('#simple-slider-img1').css('background', 'url(' + wantedProduct.frontImage + ') center center / auto no-repeat').css('background-size', 'contain');
      $('#img-fluid1').find("a").attr("href", wantedProduct.frontImage).attr("target", "_blank").find("img").attr("src", wantedProduct.frontImage);

      enterImage("img-fluid");
      enterImage("simple-slider-img");

      function enterImage(labelName) {
        for (let i = 0; i < 4; i++) {
          let imageNum = "image" + (i + 1);
          let imageSrc = wantedProduct.images[imageNum];
          if (imageSrc) {
            if (labelName === "img-fluid") {
              let imageElement = $("#" + labelName + (i + 2));
              imageElement.find("a").attr("href", imageSrc).attr("target", "_blank");
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

      function updateCartIcon() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cartIcon = document.getElementById('cartIcon');
        if (cart !== null) {
          let count = 0;
          cart.forEach(function (item) {
            count += parseInt(item.quantity);
          });
          cartIcon.setAttribute('data-count', count);
        } else {
          cartIcon.setAttribute('data-count', 0);
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

function showPopupMessage(message) {
  var popupMessage = $('<div>').attr('id', 'popup-message');
  popupMessage.insertAfter('#addToCart-container');
  popupMessage.text(message).show();

  setTimeout(function() {
    popupMessage.fadeOut();
  }, 1000);
}
    function btnOrganized() {
      let isLogin = localStorage.getItem('user') !== null;
      if (isLogin) {
        $('#login').hide();
        $('#logOut').show().click(function () {
          localStorage.removeItem('user');
          $('#login').show();
          $('#logOut').hide();
          $('#managerBtn').hide();
          $('#clientBtn').hide();
        });
        if (JSON.parse(localStorage.getItem('user')).isAdmin) {
          $('#managerBtn').show();
          $('#clientBtn').hide();
        } else {
          $('#managerBtn').hide();
          $('#clientBtn').show();
        }
      } else {
        $('#logOut').hide();
        $('#managerBtn').hide();
        $('#clientBtn').hide();
      }
    }
