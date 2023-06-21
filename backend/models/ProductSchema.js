const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: false},
    frontImage: {type: String, required: false},
    category: {type: String, required: false},
    details:{
        size: {type: String, required: false},
        brand: {type: String, required: false},
    },
    images:
        {
            image1: {type: String},
            image2: {type: String},
            image3: {type: String},
            image4: {type: String},
        },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
