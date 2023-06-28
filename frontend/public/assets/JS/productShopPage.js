
let filteredProducts = [];

$(document).ready(function () {
  btnOrganized();
  initializeImageTitle();

  let Brands = new Set();
  let Categories = new Set();
  let Sizes = new Set();
  let price = ['All Price', '0 - 200', '200 - 500', '500 - 1000', '1000 - 1500'];

  let CategoryList = $('#CategoryList');
  let BrandList = $('#BrandList');
  let priceList = $('#PriceList');
  let SizeList = $('#SizeList');


  fetch('/frontend/DB/ProductSeed.json')
    .then(response => response.json())
    .then(productSeed => {
      productSeed.forEach((item) => {
        Brands.add(item.brand);
        Categories.add(item.category);
        for (const size of item.details) {
          Sizes.add(size.size);
        }
        filterProducts();
      });
      BrandList.prepend('<option value="All Brands">All Brands</option>');
      CategoryList.prepend('<option value="All Categories">All Categories</option>');
      SizeList.prepend('<option value="All Sizes">All Sizes</option>')
      Brands.forEach((item) => {
        BrandList.append('<option value="' + item + '">' + item + '</option>');
      });
      Categories.forEach((item) => {
        CategoryList.append('<option value="' + item + '">' + item + '</option>');
      });
      Sizes.forEach((item) => {
        SizeList.append('<option value="' + item + '">' + item + '</option>');
      });
      filterProducts();
    });

  price.forEach((item) => {
    priceList.append('<option value="' + item + '">' + item + '</option>');
  });

  function filterProducts() {
    let selectedCategory = CategoryList.val();
    let selectedBrand = BrandList.val();
    let selectedPrice = priceList.val();
    let selectedSize = SizeList.val();

    $.ajax({
      // url: 'Server/filter',
      // type: 'POST',
      // data: json.stringify({
      //   "product":{
      //     category: selectedCategory,
      //     brand: selectedBrand,
      //     price: selectedPrice,
      //     size: selectedSize
      //   }
      // }),
      //
      // success: function (response) {
      //
      // }

      method: 'GET',
      url: '/frontend/DB/ProductSeed.json',
      dataType: 'json',
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
            let productId = filteredProducts[j]._id.$oid;
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

  $('#productContainer').on('click', 'a', productCartClick);

  CategoryList.on('change', filterProducts);
  BrandList.on('change', filterProducts);
  priceList.on('change', filterProducts);
  SizeList.on('change', filterProducts);

  filterProducts();
});

function productCartClick() {
  let aId = $(this).attr('id');
  let productId = aId.split('_')[1];

  let product = filteredProducts.find((product) => product._id.$oid === productId);
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

