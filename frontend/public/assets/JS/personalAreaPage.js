const meUser = JSON.parse(localStorage.getItem("user"));


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
      let imageUrl = 'assets/images/personalArea/imageTitlePersonal.jpeg';
      let backgroundImage = 'url(' + imageUrl + ') center / cover';

      $('#titleImage').css('background', backgroundImage);
      $("#titleH1").text('Your Private Beach');
      setUpUser();
      setUpTable();
    });
  });

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
  $.ajax({
    url: '/frontend/DB/OrdersSeed.json',
    type: 'GET',
    dataType: 'json',
    success: function (orders) {
      const meOrders = orders.filter(order => order.user === meUser._id.$oid);

      const orderTable = $('#order-table tbody');
      let orderNum = 0;

      meOrders.forEach(order => {
        orderNum++;
        const orderRow = `<tr>
          <td>Order ${orderNum}</td>
          <td>${order.products.length}</td>
          <td>${order.totalPrice}</td>
          <td>${order.shippingAddress}</td>
        </tr>`;
        orderTable.append(orderRow);

        const titleProduct = `<tr style="font-size: 12px">
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Size</th>
          <th>Product Quantity</th>
        </tr>`;
        orderTable.append(titleProduct);

        order.products.forEach(product => {
          const productRow = `<tr style="font-size: 12px">
            <td>${product.product}</td>
            <td>${product.unitPrice}</td>
            <td>${product.size}</td>
            <td>${product.quantity}</td>
          </tr>`;
          orderTable.append(productRow);
        });
      });
    }
  });
}





