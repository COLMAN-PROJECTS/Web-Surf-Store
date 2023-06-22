const mongoose = require('mongoose');
const Product = require('./ProductSchema');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: false
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

// Calculate the total price based on the sum of products' prices
OrderSchema.pre('save', async function (next) {
    const order = this;
    let totalPrice = 0;

    for (const product of order.products) {
        const foundProduct = await Product.findById(product.product);
        if (foundProduct) {
            totalPrice += foundProduct.price * product.quantity;
        }
    }

    order.totalPrice = totalPrice;
    next();
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
