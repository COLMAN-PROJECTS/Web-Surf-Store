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
      let imageUrl = 'assets/images/managerArea/image-title-manager.jpeg';
      let backgroundImage = 'url(' + imageUrl + ') center / cover';

      $('#titleImage').css('background', backgroundImage);
      $("#titleH1").text('Manage your beach');
    });
    $(document).ready(function () {
      $('#productForm').submit(function (e) {
        e.preventDefault();

        var formData = {
          name: $('#name').val(),
          description: $('#description').val(),
          price: parseFloat($('#price').val()),
          frontImage: $('#frontImage').val(),
          category: $('#category').val(),
          brand: $('#brand').val(),
          details: [],
          images: {
            image1: $('#image1').val(),
            image2: $('#image2').val(),
            image3: $('#image3').val(),
            image4: $('#image4').val()
          }
        };

        $('.detailRow').each(function () {
          var size = $(this).find('.size').val();
          var quantityInStock = parseInt($(this).find('.quantityInStock').val());
          formData.details.push({size: size, quantityInStock: quantityInStock});
        });

        console.log(formData);

        $('#productForm')[0].reset();
        $('#detailsContainer').children().remove();
        $('#addDetail').click();
      });

      $('#addDetail').click(function addDetailRow() {
        var newRow = '<div class="detailRow">' +
          '<input type="text" class="size" placeholder="Size">' +
          '<input type="number" class="quantityInStock" placeholder="Quantity in Stock">' +
          '</div>';
        $('#detailsContainer').append(newRow);
      });

    });
  });

