$(document).ready(function () {
  initializeImageTitle();
});

function initializeImageTitle() {
  let imageUrl = 'assets/images/TitleImage/imageTitlePayment.webp';
  let backgroundImage = 'url(' + imageUrl + ') center / cover';

  $('#titleImage').css('background', backgroundImage);
  $("#titleH1").text('Checkout Page');
}

