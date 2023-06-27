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


    $(document).ready(function () {
        productButtons();
        let imageUrl = 'assets/images/managerArea/image-title-manager.jpeg';
        let backgroundImage = 'url(' + imageUrl + ') center / cover';

        $('#titleImage').css('background', backgroundImage);
        $("#titleH1").text('Manage your store');
        getDataForTable()
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
        $('#form-container').hide();
        $('#manager-table').show();
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
                    addProduct()
                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }

        if (listItemText === 'Orders') {
            $('#product-buttons').hide();
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
            $('#product-buttons').hide();
            $.ajax({
                url: '/frontend/DB/UserSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (users) {
                    const dataWithoutId = users.map(function (users) {
                        const {_id, __v, password, orders, ...rest} = users;
                        return rest;
                    })
                    const colTitles = Object.keys(users[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'password' && key !== 'orders');

                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }
    })
}

function addProduct() {
    $('#product-buttons').show()
    $('#form-container').submit(function (e) {
        e.preventDefault();
    });

    $('#new-button').click(function () {
        $('#product-buttons').hide();
        $('#form-container').empty();
        $('#manager-table').hide()
        $('#form-container').show();
        createLabelAndInput('Name:', 'text', 'name', 'Name', true);
        createLabelAndInput('Description:', 'textarea', 'description', 'Description', false);
        createLabelAndInput('Price:', 'number', 'price', 'Price', true);
        createLabelAndInput('Front Image:', 'text', 'frontImage', 'Front Image URL', true);
        createLabelAndInput('Category:', 'text', 'category', 'Category', true);
        createLabelAndInput('Brand:', 'text', 'brand', 'Brand', true);
        createDetailRow();

        createLabelAndInput('Image 1:', 'text', 'image1', 'Image 1 URL', false);
        createLabelAndInput('Image 2:', 'text', 'image2', 'Image 2 URL', false);
        createLabelAndInput('Image 3:', 'text', 'image3', 'Image 3 URL', false);
        createLabelAndInput('Image 4:', 'text', 'image4', 'Image 4 URL', false);

        var submitButton = $('<button></button>').attr({
            type: 'button',
            id: 'submitForm',
            class: 'btn btn-primary'
        }).text('Submit');
        $('#form-container').append(submitButton);

        $('#submitForm').click(function () {
                var form = $('#form-container')[0];
                if (form.checkValidity() === false) {
                    form.reportValidity();
                    return false;
                } else {
                    var product = {
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
                        var detail = {
                            size: size,
                            quantityInStock: quantityInStock
                        };
                        product.details.push(detail);
                    });

                    console.log(product);
                    $.ajax({
                        url: '/frontend/DB/ProductSeed.json',
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(product),
                        contentType: 'application/json',
                        success: function (response) {
                            console.log('Product created successfully:', response);
                        },
                        error: function (error) {
                            console.log('Error creating product:', error);
                        }
                    });
                    $('#form-container').hide();


                }
            }
        )
        ;
    });
}


function createLabelAndInput(labelText, inputType, inputId, inputPlaceholder, isRequired) {
    var label = $('<label></label>').text(labelText);
    var input = $('<input>').attr({
        type: inputType,
        id: inputId,
        placeholder: inputPlaceholder,
        required: isRequired,
        autocomplete: 'off',
        maxLength: 30,
    });
    label.append(input);
    $('#form-container').append(label, '<br>');
}


function createDetailRow() {
    var addDetailButton = $('<button></button>').attr({
        type: 'button',
        id: 'addDetail',
        class: 'btn btn-primary btn-sm'
    }).text('Add details');
    $('#form-container').append(addDetailButton);
    reCreateRow();

    function reCreateRow() {
        var detailRow = $('<div class="detailRow"></div>');
        var sizeInput = $('<input></input>').attr({
            type: 'text',
            class: 'size',
            placeholder: 'Size',
            required: true,
            maxLength: 30

        });
        var quantityInput = $('<input></input>').attr({
            type: 'number',
            class: 'quantityInStock',
            placeholder: 'Quantity in Stock',
            required: true,
            maxLength: 30
        });
        detailRow.append(sizeInput, quantityInput);
        $('#form-container').append(detailRow);
        detailRow.insertBefore('#addDetail');
    }

    addDetailButton.click(function () {
        reCreateRow()
    });

}

function productButtons() {
    var productButtons = $('<div></div>').attr({
        id: 'product-buttons'
    });
    $('#manager-table').append(productButtons);
    productButtons.insertBefore('#manager-table');

    var newButton = $('<button></button>').attr({
        type: 'button',
        id: 'new-button',
        class: 'btn btn-primary btn-sm'
    }).text('New Product');
    $('#product-buttons').append(newButton);
    productButtons.hide()
}


