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
    document.addEventListener("DOMContentLoaded", function () { //TODO: not needed?
        $(document).ready(function () {
            let imageUrl = 'assets/images/managerArea/image-title-manager.jpeg';
            let backgroundImage = 'url(' + imageUrl + ') center / cover';

            $('#titleImage').css('background', backgroundImage);
            $("#titleH1").text('Manage your store');
        });
        $(document).ready(function () { //TODO: not needed?


            $('#productForm').hide();
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
            getDataForTable()
        });
    });

function populateTable(colTitles, data) {
    var table = $('#manager-table');
    var tableHead = $('#manager-table-thead');
    var tableBody = $('#manager-table-tbody');

    tableHead.empty();
    tableBody.empty();

    var headerRow = $("<tr></tr>");
    colTitles.forEach(function (title) {
        var headerCell = $("<th></th>").text(title);
        headerRow.append(headerCell);
    });
    tableHead.append(headerRow);

    data.forEach(function (item) {
        var row = $("<tr></tr>");
        Object.values(item).forEach(function (value) {

            var cell = $("<td></td>").text(value);
            row.append(cell);
        });
        tableBody.append(row);
    });

}

function getDataForTable() {
    $('.list-group-item').click(function () {
        var listItemText = $(this).text().trim();

        if (listItemText === 'Products') {
            $.ajax({
                url: '/frontend/DB/ProductSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (products) {
                    const dataWithoutId = products.map(function (products) {
                        const {_id, __v, details, images, frontImage, description, ...rest} = products;
                        return rest;
                    })
                    const colTitles = Object.keys(products[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'details' && key !== 'images' && key !== 'frontImage' && key !== 'description');

                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }

        if (listItemText === 'Orders') {
            $.ajax({
                url: '/frontend/DB/OrdersSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (orders) {
                    const dataWithoutId = orders.map(function (orders) {
                        const {_id, __v, user, ...rest} = orders;
                        const fullName = orders.user.fullName //TODO: check if this works after changing the DB
                        return {fullName, ...rest};
                    })
                    const colTitles = Object.keys(orders[0]).filter(key => key !== '_id' && key !== '__v');

                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }

        if (listItemText === 'Users') {
            $.ajax({
                url: '/frontend/DB/UserSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (users) {
                    const dataWithoutId = users.map(function (users) {
                        const {_id, __v, password, ...rest} = users;
                        return rest;
                    })
                    const colTitles = Object.keys(users[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'password');

                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }
    })
}

