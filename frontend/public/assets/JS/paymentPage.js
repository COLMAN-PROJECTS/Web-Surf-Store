
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
  console.log(orderData);
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/orders",
    contentType: "application/json",
    data: orderData,
    success: function (data) {
      console.log("Order sent successfully");
      alert("Order sent successfully")
        $("#orderCompleted").show();
      setTimeout(function () {
        window.location.href = './index.html'
      }, 5000);
    },

    error: function (data) {
      console.log("Error sending order");
      alert("Error sending order")
      conlose.log(data);
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

  $("#confirmBtn").click(function() {
    if (validateForm()) {
      const user=JSON.parse(localStorage.getItem("user"));
      var paymentDetails = {
        user:user._id.$oid,
        products: JSON.parse(localStorage.getItem("products")),
        shippingAddress: user.address,
        paymentMethod: 'Credit Card',
        userName: $("#userName").val(),
        cardNumber: $("#creditCardNumber").val(),
        expirationMonth: $("#MM").val(),
        expirationYear: $("#YY").val(),
        cvv: $("#CVV").val()
      };
      console.log(paymentDetails);

      //this is a valid order
      const order={
        user:user._id.$oid,
        products: JSON.parse(localStorage.getItem("products")),
        shippingAddress: user.address,
        paymentMethod: 'Credit Card',
      }
      sendOrder(order);
     // createPost('check this out!!'+ user.fullName + ' just bought products from us')
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

