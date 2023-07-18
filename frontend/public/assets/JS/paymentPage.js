$(document).ready(function () {
  initializeImageTitle();
  btnOrganized();
});

function initializeImageTitle() {
  let imageUrl = 'assets/images/TitleImage/imageTitlePayment.webp';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Checkout Page');
}

function sendOrder(orderData) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/orders",
    contentType: "application/json",
    data: JSON.stringify(orderData),
    success: function (data) {
      console.log("Order sent successfully");
      const user = JSON.parse(localStorage.getItem("user"));
      createPost(`Check this out: New order has been made by ${user.fullName} !`)

      $("#orderCompleted").show();
      setTimeout(function () {
        window.location.href = '../index.html';
      }, 2000);
      localStorage.removeItem("products");
      localStorage.removeItem("cart");
    },

    error: function (data) {
      console.log("Error sending order");
      $("#orderNotCompleted").show();
      setTimeout(function () {
        $("#orderNotCompleted").hide();
      }, 2500);
    }
  });
}

function validateForm() {
  var userName = $("#userName").val();
  var cardNumber = $("#creditCardNumber").val();
  var MM = $("#MM").val();
  var YY = $("#YY").val();
  var CVV = $("#CVV").val();

  // Perform basic validation tests
  if (userName.trim() === "") {
    console.log("wrong details");
    $("#orderNotCompleted").show();
    setTimeout(function () {
      $("#orderNotCompleted").hide();
    }, 2500);
    return false;
  }

  if (cardNumber.trim() === "") {
    console.log("wrong details");
    $("#orderNotCompleted").show();
    setTimeout(function () {
      $("#orderNotCompleted").hide();
    }, 2500);
    return false;
  }

  if (MM.trim() === "" || YY.trim() === "") {
    console.log("wrong details");
    $("#orderNotCompleted").show();
    setTimeout(function () {
      $("#orderNotCompleted").hide();
    }, 2500);
    return false;
  }

  if (CVV.trim() === "") {
    console.log("wrong details");
    $("#orderNotCompleted").show();
    setTimeout(function () {
      $("#orderNotCompleted").hide();
    }, 2500);
    return false;
  }
  return true;
}

$("#confirmBtn").click(function () {
  if (validateForm()) {
    const user = JSON.parse(localStorage.getItem("user"));

    const products = JSON.parse(localStorage.getItem("products"));

    let productsID = [];
    for (let i = 0; i < products.length; i++) {
      productsID.push({
        product: products[i].product._id,
        size: products[i].size,
        quantity: products[i].quantity
      });
    }

    const order = {
      user: user._id,
      products: productsID,
      shippingAddress: user.address,
      paymentMethod: 'Credit Card'
    }
    sendOrder(order);
  }
});

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

