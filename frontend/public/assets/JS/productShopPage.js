let filteredProducts = [];
let res;
let BrandList = $('#BrandList');
let CategoryList = $('#CategoryList');
let priceList = $('#PriceList');
let SizeList = $('#SizeList');
$(document).ready(function () {
    btnOrganized();
    initializeImageTitle();

    let Brands = new Set();
    loadFilters('brand', Brands, BrandList, 'All Brands')

    let Categories = new Set();
    loadFilters('category', Categories, CategoryList, 'All Categories')
    let Sizes = new Set();
    loadFilters('details.size', Sizes, SizeList, 'All Sizes')
    let price = ['All Price', '0 - 200', '200 - 500', '500 - 1000', '1000 - 1500'];


    price.forEach((item) => {
        priceList.append('<option value="' + item + '">' + item + '</option>');
    });


    $('#productContainer').on('click', 'a', productCartClick);

    CategoryList.on('change', filterProducts);
    BrandList.on('change', filterProducts);
    priceList.on('change', filterProducts);
    SizeList.on('change', filterProducts);

    filterProducts();
});

function productCartClick() {
    let aId = $(this).attr('id');
    console.log(aId);
    let productId = aId.split('_')[1];

    let product = filteredProducts.find((product) => product._id === productId);
    console.log(product);
    if (product) {
        localStorage.setItem('product', JSON.stringify(product));
        console.log('Product added to cart', product);
    }
}

function initializeImageTitle() {
    let imageUrl = 'assets/images/productShop/sup-head.jpeg';
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
            $('#clientBtn').show().click(function () {
                window.location.href = 'personalAreaPage.html';
            });
        }
    } else {
        $('#logOut').hide();
        $('#managerBtn').hide();
        $('#clientBtn').hide();
    }
}

function loadFilters(field, filterList, menuList, filterName) {
    $.ajax({
        url: 'http://localhost:3000/products/groupBy/' + field,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            if (field === 'details.size') {
                data.forEach(item => {
                    item._id.forEach(size => {
                        filterList.add(size)
                    })
                })
            } else {
                data.forEach(item => {
                    filterList.add(item._id)
                })
            }
            let value = filterName;
            menuList.append(`<option value="${value}">${value}</option>`);
            filterList.forEach((item) => {
                menuList.append('<option value="' + item + '">' + item + '</option>');
            });
            filterProducts();
        },
        error: function (error) {
            console.log(`Error ${error}`);
            res = [];
        }
    })
}

function filterProducts() {
    let selectedCategory = CategoryList.val();
    let selectedBrand = BrandList.val();
    let selectedPrice = priceList.val();
    let selectedSize = SizeList.val();

    $.ajax({
        url: 'http://localhost:3000/products/filter',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                category: selectedCategory,
                brand: selectedBrand,
                price: selectedPrice,
                size: selectedSize
            }),
        success: function (products) {
            $('#productContainer').empty();

            filteredProducts = products.filter((product) => {
                return (
                    (selectedCategory === 'All Categories' || product.category === selectedCategory) &&
                    (selectedBrand === 'All Brands' || product.brand === selectedBrand) &&
                    (selectedPrice === 'All Price' || (selectedPrice.includes('-') &&
                            product.price >= parseFloat(selectedPrice.split('-')[0]) &&
                            product.price <= parseFloat(selectedPrice.split('-')[1])) ||
                        (selectedPrice === '200+' && product.price >= 200)) &&
                    (selectedSize === 'All Sizes' || product.details.some(detail => detail.size === selectedSize))
                );
            });


            if (filteredProducts.length === 0) {
                $('#productContainer').append("<h1> No products found </h1>");
            } else {
                for (let j = 0; j < filteredProducts.length; j++) {
                    let productId = filteredProducts[j]._id;
                    let productImage = filteredProducts[j].frontImage;
                    let productName = filteredProducts[j].name;
                    let productPrice = filteredProducts[j].price;

                    let htmlCode = `
                        <div id="productItem_${productId}" class="col">
                          <div>
                            <a id="product-cart_${productId}" href="./productPage.html" target="_blank">
                              <img class="img-fluid product-image-shop" style="height: 200px;" src="${productImage}" width="416" height="200">
                            </a>
                            <div class="py-4">
                              <h4 class="text-center"><span style="color: rgb(51, 51, 51);">${productPrice}</span></h4>
                              <p class="text-center"><span style="color: rgb(51, 51, 51);">${productName}</span></p>
                            </div>
                          </div>
                        </div>
                      `;
                    $('#productContainer').append(htmlCode);
                }
            }
        },
    });
}

