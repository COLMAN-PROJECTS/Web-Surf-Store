$(document).ready(function () {
  $("#login").hide();
  $("#logOut").hide();
  $("#managerBtn").hide();
  $("#clientBtn").hide();
    productButtons();
    initializeImageTitle()
    getDataForTable()
    loadGroupByData('category');


    $('.list-group-item#statistics').click(function () {
        $('#manager-table').hide();
        $('#product-buttons').hide();
        $('#graph-container').empty();
        loadGraphs(graphTest2, 'Total Sell profit');
        $('#graph-container').show();
    });
});


function initializeImageTitle() {
    let imageUrl = 'assets/images/managerArea/image-title-manager.jpeg';
    let backgroundImage = 'url(' + imageUrl + ') center / cover';

    $('#titleImage').css('background', backgroundImage);
    $("#titleH1").text('Manage your store');
}

function populateTable(colTitles, data) {
    var table = $('#manager-table');
    var tableHead = $('#manager-table-thead');
    var tableBody = $('#manager-table-tbody');

    tableHead.empty();
    tableBody.empty();

    var headerRow = $("<tr></tr>");
    colTitles.forEach(function (title) {
        var viewableTitle = setTitles(title);
        var headerCell = $("<th></th>").text(viewableTitle);
        if (title === '_id') {
            headerCell.text('');
        }
        headerRow.append(headerCell);
    });
    headerRow.append("<th></th>"); // Add a column for buttons
    tableHead.append(headerRow);

    data.forEach(function (item) {
        var row = $("<tr></tr>");
        Object.entries(item).forEach(function ([key, value]) {
            if (key === '_id') {
                var emoji = '\u{1F4CB}';
                var cell = $("<td></td>").text(emoji).val(Object.values(value)[0]);
                row.append(cell);
            } else {
                if (typeof value === 'object' && value !== null) {
                    var txt = '\u{1F4CE}';
                    value = JSON.stringify(value);
                    cell = $("<td></td>").text(txt).val(value);
                } else if (typeof value === 'string' && value.length > 17) {
                    txt = value.substring(0, 20) + '...';
                    cell = $("<td></td>").text(txt).val(value);
                } else {
                    cell = $("<td></td>").text(value).val(value)
                }
                row.append(cell);
            }
        });

        var buttonsCell = $("<td></td>");
        var editButton = $('<button></button>').attr({
            type: 'button',
            class: 'btn btn-sm btn-outline-info mr-1',
            id: 'edit-button',
        }).text('\u{1F504}');
        var deleteButton = $('<button></button>').attr({
            type: 'button',
            class: 'btn btn-sm btn-outline-danger ml-1',
            id: 'delete-button',
        }).text('\uD83D\uDDD1');

        // Attach event handlers to the buttons
        editButton.click(function () {
            enableRowEditing(row);
        });

        deleteButton.click(function () {
            deleteRow(row);
        });

        buttonsCell.append(editButton, deleteButton);
        row.append(buttonsCell);
        tableBody.append(row);
    });
}

function enableRowEditing(row) {
    row.addClass('edit-mode');

    var cells = row.find('td:not(:first-child):not(:last-child)');

    cells.each(function () {
        var cell = $(this);
        var input = $('<input>').val(cell.val());
        cell.append(input);
    });

    var editButton = row.find('#edit-button');

    editButton.text('\u2714');

    editButton.click(function () {
        if (row.hasClass('edit-mode')) {

            var rowId = row.find('td:first-child').val();
            var updatedData = {};

            // Get updated data
            cells.each(function () {
                var cell = $(this);
                var input = cell.find('input');
                var col = row.closest('tbody').prev('thead').find('th').eq(cell.index()).text();
                var originalValue = cell.text();
                var updatedValue = input.val();
                if (originalValue !== updatedValue) {
                    updatedData[col] = updatedValue;
                } else {
                    updatedData[col] = originalValue;
                }

                cell.text(cell.val());
            });

            //for testing
            row.removeClass('edit-mode');
            editButton.text('\u{1F504}');
            if (Object.keys(updatedData).length > 0) {
                console.log(JSON.stringify(updatedData));
            }
            alert('Row updated successfully');

            // Send the update request if there are changes
            if (Object.keys(updatedData).length > 0) {
                // Send the PATCH request to update the row
                $.ajax({
                    url: '/frontend/DB/OrdersSeed.json',
                    type: 'PATCH',
                    data: {_id: rowId, ...updatedData},
                    dataType: 'json',
                    success: function (response) {
                        if (response.status === '200') {
                            row.removeClass('edit-mode');
                            editButton.text('\u{1F504}');

                            var updatedRowData = response.data;
                            cells.each(function () {
                                var cell = $(this);
                                var columnName = row.closest('tbody').prev('thead').find('th').eq(cell.index()).text();
                                var updatedValue = updatedRowData[columnName];
                                cell.text(updatedValue);
                            });
                            alert('Row updated successfully');
                        }
                    },
                    error: function (error) {
                        console.error('Error updating row:', error);
                    }
                });
            } else {
                alert('No changes to update');
            }
        } else {
            enableRowEditing(row);
        }
    });
}


function deleteRow(row) {
    var rowId = row.find('td:first-child').val();
    alert("Item deleted successfully with id: " + rowId);
    $.ajax({
        url: '/frontend/DB/OrdersSeed.json',
        type: 'DELETE',
        data: {_id: rowId},
        dataType: 'json',
        success: function (response) {
            alert(response)
            if (response.status === '200') {
                alert('Row deleted successfully');
                row.remove();
            }
        },
        error: function (error) {
            console.error('Error deleting row:', error);
        }
    });
}


function getDataForTable() {
    $('.list-group-item').click(function () {
        $('#table-container-title').hide();
        $('#form-container').hide();
        $('#manager-table').show();
        var listItemText = $(this).text().trim();

        if (listItemText === 'Products') {
          $('#graph-container').hide()
          $.ajax({
                url: '/frontend/DB/ProductSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (products) {
                    const dataWithoutId = products.map(function (products) {
                        const {__v, details, images, frontImage, description, ...rest} = products;
                        return rest;
                    })
                    const colTitles = Object.keys(products[0]).filter(key => key !== '__v' && key !== 'details' && key !== 'images' && key !== 'frontImage' && key !== 'description');
                    addProduct()
                    console.log(colTitles);
                    populateTable(colTitles, dataWithoutId);
                }
            })
        }

        if (listItemText === 'Orders') {
            $('#product-buttons').hide();
            $('#graph-container').hide()
            $.ajax({
                url: '/frontend/DB/OrdersSeed.json',
                type: 'GET',
                dataType: 'json',
                success: function (orders) {
                    const dataWithoutId = orders.map(function (orders) {
                        const {__v, user, ...rest} = orders;
                        return rest;
                    })
                    const colTitles = Object.keys(orders[0]).filter(key => key !== 'user' && key !== '__v');

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
                        const {__v, password, orders, ...rest} = users;
                        return rest;
                    })
                    const colTitles = Object.keys(users[0]).filter(key => key !== '__v' && key !== 'password' && key !== 'orders');

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

function setTitles(title) {
    var titleMapper = {
        'fullName': 'Full Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'isAdmin': 'Admin',
        'products': 'Products',
        'totalPrice': 'Total Price',
        'shippingAddress': 'Shipping Address',
        'paymentMethod': 'Payment Method',
        'name': 'Name',
        'description': 'Description',
        'price': 'Price',
        'category': 'Category',
        'brand': 'Brand',
        'details': 'Details',
        'images': 'Images',
    }

    if (titleMapper.hasOwnProperty(title)) {
        return titleMapper[title];
    } else {
        return title;
    }
}

function loadGroupByData(groupByField) {
    $.ajax({
        url: 'http://localhost:3000/orders/groupBy/' + groupByField,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log('GroupBy data loaded successfully:', response);
            response.forEach(function (group) {
                renderGroup(group);
            });
        },
        error: function (error) {
            console.log('Error loading groupBy data:', error);
        }
    });
}

    function renderGroup(group) {
        var groupDiv = $('<div>').addClass('d-flex align-items-center mt-3');
        var fileBox = $('<div>').addClass('fm-file-box').addClass(getFileBoxClass(group._id));
        var icon = $('<i>').addClass('bx bx-image');
        fileBox.append(icon);
        var infoDiv = $('<div>').addClass('flex-grow-1 ms-2');
        var title = $('<h6>').addClass('mb-0').text(group._id);
        var count = $('<p>').addClass('mb-0 text-secondary').text('Count: ' + group.count);
        infoDiv.append(title, count);
        var totalPrice = $('<h6>').addClass('text-primary mb-0').text('$' + group.totalPrice);
        groupDiv.append(fileBox, infoDiv, totalPrice);

        $('#grouby-card').append(groupDiv);
    }


    function getFileBoxClass(groupByField) {
        switch (groupByField) {
            case 'Surfboards':
                return 'bg-light-primary text-primary';
            case "SUP":
                return 'bg-light-success text-success';
            case 'Wetsuits':
                return 'bg-light-danger text-danger';
            case 'Accessories':
                return 'bg-light-warning text-warning';
            default:
                return 'bg-light-info text-info';
        }
    }

var graphTest = [];
graphTest.push({
    name: 'Surfboards',
  frequency: 250
}, {
    name: 'SUP',
  frequency: 1250
}, {
    name: 'Wetsuits',
  frequency: 1000
}, {
    name: 'Accessories',
  frequency: 500
}, {
    name: 'Other',
  frequency: 100
})

var graphTest2 = [];
graphTest2.push({
  name: 'Eviatar',
  frequency: 250
}, {
  name: 'Moshiko',
  frequency: 1250
}, {
  name: 'Nadav',
  frequency: 1000
}, {
  name: 'Pini',
  frequency: 500
}, {
  name: 'Dor',
  frequency: 100
}, {
  name: 'asdgas',
  frequency: 2050
}, {
  name: 'asgassww',
  frequency: 400
})

    function loadGraphs(data, value) {
      const width = 500;
      const height = 500;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      // Declare the x (horizontal position) scale.
      const x = d3.scaleBand()
        .domain(d3.groupSort(data, ([d]) => - (d.frequency/100), (d) => d.name)) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      // Declare the y (vertical position) scale.
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => (d.frequency/100))])
        .range([height - marginBottom, marginTop]);

      // Create the SVG container.
      const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      // Add a rect for each bar.
      svg.append("g")
        .attr("fill", "steelblue")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.frequency/100))
        .attr("height", (d) => y(0) - y(d.frequency/100))
        .attr("width", x.bandwidth());

      // Add the x-axis and label.
      svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Add the y-axis and label, and remove the domain line.
      svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", - marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ " + value + " (%)"));
    }




