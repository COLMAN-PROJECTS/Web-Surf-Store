let meUser = JSON.parse(localStorage.getItem("user"));


    $(document).ready(function () {
      initializeImageTitle();
      $.when($.ajax({
        url: 'http://localhost:3000/profile/email/' + meUser.email,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (user) {
          meUser = user;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user));
        },
        error: function (err) {
          console.log(err);
        }
      })).done(function () {
        setUpUser();
        setUpTable();
        updateCartIcon();
      });
    });

function initializeImageTitle() {
  let imageUrl = 'assets/images/personalArea/imageTitlePersonal.jpeg';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Your Private Beach');
}

function setUpUser() {
  if (meUser) {
    $('#user-name').text(meUser.fullName);
    $('#user-name2').text(meUser.fullName);
    $('#user-email em').text(meUser.email);
    $('#user-phone').text(meUser.phone);
    $('#user-address').text(meUser.address);
  }
}

function setUpTable() {
  if (meUser) {
    const orderTable = $('#order-table tbody');
    let orderNum = 0;

    meUser.orders.forEach(order => {
      orderNum++;
      const orderRow = `<tr>
          <td>Order ${orderNum}</td>
          <td>${order.createdAt.substring(0,10)}</td>
          <td>${order.products.length}</td>
          <td>${order.totalPrice}</td>
          <td>${order.shippingAddress}</td>
        </tr>`;
      orderTable.append(orderRow);

      const titleProduct = `<tr style="font-size: 12px">
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Size</th>
          <th>Product Quantity</th>
        </tr>`;
      orderTable.append(titleProduct);

      order.products.forEach(product => {
        const productRow = `<tr style="font-size: 12px">
            <td><img class="image-product" src="${product.product.frontImage}" alt="Product Image"></td>
            <td>${product.product.name}</td>
            <td>${product.product.price}</td>
            <td>${product.size}</td>
            <td>${product.quantity}</td>
          </tr>`;
        orderTable.append(productRow);
      });
    });
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




