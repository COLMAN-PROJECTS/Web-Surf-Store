$(document).ready(function () {
  btnOrganized();
  initializeImageTitle();
  initializeBestOffers();
  updateCartIcon();
});

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

function initializeBestOffers() {
  $('#bestOffers h1').text('Our Best Offers');
  $.ajax({
    url: 'http://localhost:3000/products',
    type: 'GET',
    dataType: 'json',
    application: 'json',
    success: function (product) {
      for (let j = 0; j < 3; j++) {
        let productImageId = '#bestOffersImg' + (j + 1);
        let productPId = '#bestOffersP' + (j + 1);

        $(productImageId + ' img').attr('src', 'public/' + product[j].frontImage);
        $(productPId).html(product[j].name + "<br>" + product[j].price + "$");
      }
    }
  })
}

function initializeImageTitle() {
  let imageUrl = 'public/assets/images/homePage/imageTitelHomePage.webp';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Discover, Shop, and Surf the Best');
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



