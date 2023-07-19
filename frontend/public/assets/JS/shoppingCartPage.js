
$(document).ready(function () {
  updateCartIcon();
  let imageUrl = 'assets/images/productShop/sup-head.jpeg';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Shopping Cart');
})

  const dataCart = JSON.parse(localStorage.getItem('cart'));

  function generateCartItemHTML(imageSrc, productName, category, price, size, quantity) {
    return `
    <tr>
      <th scope="row" class="border-0">
        <div class="p-2">
          <img src="${imageSrc}" alt="" width="70" class="img-fluid rounded shadow-sm">
          <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0"><a href="#" class="text-dark d-inline-block align-middle">${productName}</a></h5>
            <span class="text-muted font-weight-normal font-italic d-block">Category: ${category}</span>
          </div>
        </div>
      </th>
      <td class="border-0 align-middle"><strong>${price}</strong></td>
      <td class="border-0 align-middle"><strong>${size}</strong></td>
      <td class="border-0 align-middle"><strong>${quantity}</strong></td>
      <td class="border-0 align-middle"><button id="removeBtn" class="text-dark"><i class="fa fa-trash"></i></button></td>
    </tr>
  `;
  }

  $(document).ready(function() {
    btnOrganized();
    const cartItems = dataCart;
    let cartHTML = '';

    cartHTML += `
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Size</th>
        <th scope="col">Quantity</th>
        <th scope="col"></th>
      </tr>
    `;

    if (cartItems && cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = cartItem.product;
        const imageSrc = product.frontImage;
        const productName = product.name;
        const category = product.category;
        const price = '$ ' + product.price;
        const size = cartItem.size;
        const quantity = cartItem.quantity;

        cartHTML += generateCartItemHTML(imageSrc, productName, category, price, size, quantity);
      }
    } else {
      cartHTML += '<tr><td colspan="4" class="text-center">Your cart is empty.</td></tr>';
    }

    $('table tbody').html(cartHTML);
    calcSummary();
  });

  $(document).on('click', '#removeBtn', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const index = $(this).closest('tr').index() - 1;

    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    location.reload();
  });


  function calcSummary() {
    let orderSummary = 0;
    if (dataCart && dataCart.length > 0) {
      dataCart.forEach(function (item) {
        orderSummary += item.product.price * item.quantity;
      });
    }

    let shipping = 0;
    if(orderSummary > 0)
      shipping =  10

    const tax = (orderSummary * 0.18);

    let total = (tax + shipping + orderSummary);

    document.getElementById('orderSubtotal').textContent = '$ '+ orderSummary.toFixed(2);
    document.getElementById('shipping').textContent = '$ '+ shipping;
    document.getElementById('tax').textContent = '$ '+ tax.toFixed(2);
    document.getElementById('total').textContent = '$ '+total.toFixed(2);

  }

  //todo connect to the right button after we will make the payment page
  $('#purchaseBtn').click(function() {
    const cartItems = [];

    const dataCart = JSON.parse(localStorage.getItem('cart'));

    // Iterate over each cart item
    dataCart.forEach(function(item) {
      const cartItem = {
        productId: item.id,
        size: item.size,
        quantity: 1
      };

      cartItems.push(cartItem);
    });

    const payload = {
      cart: cartItems,
    };
    console.log(JSON.stringify(payload));


  });
  $(document).on('click','#checkOutBtn', function(){

    var isLoggedIn =JSON.parse(localStorage.getItem("user"))
    console.log(isLoggedIn)

    if (!isLoggedIn ) {
      event.preventDefault();
    }

    else{
      if (dataCart.length > 0) {
        localStorage.setItem('products', JSON.stringify(dataCart));
      window.location.href = "paymentPage.html";
      }
      else{
      }
    }
  })

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
        $('#clientBtn').show().click(function () {
          window.location.href = 'personalAreaPage.html';
        });
      }
    } else {
      $('#logOut').hide();
      $('#managerBtn').hide();
      $('#clientBtn').hide();
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

