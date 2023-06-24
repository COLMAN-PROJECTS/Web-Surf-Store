window.innerWidth < 768 && [].slice.call(document.querySelectorAll("[data-bss-disabled-mobile]")).forEach((function (e) {
  e.classList.remove("animated"), e.removeAttribute("data-bss-hover-animate"), e.removeAttribute("data-aos"), e.removeAttribute("data-bss-parallax-bg"), e.removeAttribute("data-bss-scroll-zoom")
})), document.addEventListener("DOMContentLoaded", (function () {
$(document).ready(function () {
  let imageUrl = 'assets/images/productShop/sup-head.jpeg';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Shopping Cart');
})

  const dataCart = JSON.parse(localStorage.getItem('cart'));

  function generateCartItemHTML(imageSrc, productName, category, price, quantity) {
    return `
    <tr>
      <th scope="row" class="border-0">
        <div class="p-2">
          <img src="${imageSrc}" alt="" width="70" class="img-fluid rounded shadow-sm">
          <div class="ml-3 d-inline-block align-middle">
<!--          add to the -->
            <h5 class="mb-0"><a href="#" class="text-dark d-inline-block align-middle">${productName}</a></h5>
            <span class="text-muted font-weight-normal font-italic d-block">Category: ${category}</span>
          </div>
        </div>
      </th>
      <td class="border-0 align-middle"><strong>${price}</strong></td>
      <td class="border-0 align-middle"><strong>${quantity}</strong></td>
      <td class="border-0 align-middle"><button id="removeBtn" class="text-dark"><i class="fa fa-trash"></i></button></td>
    </tr>
  `;
  }

  $(document).ready(function() {
    const cartItems = dataCart;

    let cartHTML = '';
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach(function(item) {
        cartHTML += generateCartItemHTML(item.frontImage, item.name, item.category, item.price, 1);
      });
    } else {
      cartHTML = '<tr><td colspan="4" class="text-center">Your cart is empty.</td></tr>';
    }

    $('table tbody').html(cartHTML);
    calcSummary();
  });

  $(document).on('click', '#removeBtn', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const index = $(this).closest('tr').index();

    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    location.reload();
  });


  function calcSummary() {
    let orderSummary = 0;
    dataCart.forEach(function(item) {
      orderSummary += item.price
    });

    const shipping = 10;

    const tex = (orderSummary * 1.18);

    let total = (tex + shipping);

    document.getElementById('orderSubtotal').textContent = '$ '+ orderSummary;
    document.getElementById('shipping').textContent = '$ '+ shipping;
    document.getElementById('tax').textContent = '$ '+ tex.toFixed(2);
    document.getElementById('total').textContent = '$ '+total.toFixed(2);

  }


}));
