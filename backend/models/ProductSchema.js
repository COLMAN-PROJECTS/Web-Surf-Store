const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    frontImage: {type: String, required: true},
    category: {type: String, required: true},
    details:{
        size: {type: String, required: true},
        brand: {type: String, required: true},
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
