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
        $(document).ready(function () {

            $('#productForm').submit(function (e) {
                e.preventDefault();
                // Your form submission logic here
            });

            $('#showFormBtn').click(function () {
                $('#productForm').show();

                // Create labels and inputs dynamically
                createLabelAndInput('Name:', 'text', 'name', 'Name');
                createLabelAndInput('Description:', 'textarea', 'description', 'Description');
                createLabelAndInput('Price:', 'number', 'price', 'Price');
                createLabelAndInput('Front Image:', 'text', 'frontImage', 'Front Image URL');
                createLabelAndInput('Category:', 'text', 'category', 'Category');
                createLabelAndInput('Brand:', 'text', 'brand', 'Brand');
                createDetailRow();

                createLabelAndInput('Image 1:', 'text', 'image1', 'Image 1 URL');
                createLabelAndInput('Image 2:', 'text', 'image2', 'Image 2 URL');
                createLabelAndInput('Image 3:', 'text', 'image3', 'Image 3 URL');
                createLabelAndInput('Image 4:', 'text', 'image4', 'Image 4 URL');
            });

            function createLabelAndInput(labelText, inputType, inputId, inputPlaceholder) {
                var label = $('<label></label>').text(labelText);
                var input = $('<input></input>').attr({
                    type: inputType,
                    id: inputId,
                    placeholder: inputPlaceholder,
                    required: true
                });
                label.append(input);
                $('#detailsContainer').append(label, '<br>');
            }

            function createDetailRow() {
                var detailRow = $('<div class="detailRow"></div>');
                var sizeInput = $('<input></input>').attr({
                    type: 'text',
                    class: 'size',
                    placeholder: 'Size',
                    required: true
                });
                var quantityInput = $('<input></input>').attr({
                    type: 'number',
                    class: 'quantityInStock',
                    placeholder: 'Quantity in Stock',
                    required: true
                });
                detailRow.append(sizeInput, quantityInput);
                $('#detailsContainer').append(detailRow);
            }
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
            if (typeof value === 'object' && value !== null) {
                value = '\u{1F4CB}';
            }
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
                        const {_id, __v, password, orders, ...rest} = users;
                        return rest;
                    })
                    const colTitles = Object.keys(users[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'password' &&  key !== 'orders');

                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }
    })
}

