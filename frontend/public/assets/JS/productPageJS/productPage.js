window.innerWidth < 768 && [].slice.call(document.querySelectorAll("[data-bss-disabled-mobile]")).forEach((function (e) {
  e.classList.remove("animated"), e.removeAttribute("data-bss-hover-animate"), e.removeAttribute("data-aos"), e.removeAttribute("data-bss-parallax-bg"), e.removeAttribute("data-bss-scroll-zoom")
})), document.addEventListener("DOMContentLoaded", (function () {
  $(document).ready(function () {
    // Size dropdown
    $('#size-drop a').click(function () {
      let selectedSize = $(this).text();
      $('#size-drop-text span').text(selectedSize);
    });

    // Quantity dropdown
    $('#quantity-drop a').click(function () {
      let selectedQuantity = $(this).text();
      $('#quantity-drop-text span').text(selectedQuantity);
    });

    // Add to cart button click event
    $('#addToCartBtn').click(function () {
      var selectedSize = $('.size-dropdown .x-drop-btn span').text();
      var selectedQuantity = $('.quantity-dropdown .x-drop-btn span').text();
      addToCart(selectedSize, selectedQuantity);
    });

    // Function to handle adding to cart
    function addToCart(size, quantity) {
      // Perform actions with the selected size and quantity
      console.log('Selected size:', size);
      console.log('Selected quantity:', quantity);
      // You can pass the selected size and quantity to another function or store them in variables, etc.
    }
  });

}), !1);
