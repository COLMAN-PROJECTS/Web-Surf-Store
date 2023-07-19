
  $(document).ready(function () {
    initializeImageTitle();
    btnOrganized();
    updateCartIcon();
  });

function initializeImageTitle() {
  let imageUrl = 'assets/images/beachInfo/beach-info-up.jpeg';
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
