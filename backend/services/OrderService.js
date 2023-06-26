const Order = require('../models/OrderSchema');
const Product = require('./ProductService');
const User = require('./UserService');


const createOrder = async (orderData) => {
    const order = new Order({
        user: orderData.user,
        products: [...orderData.products],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
    });

    let totalPrice = 0;

    for (const product of order.products) {
        const { product: productId, quantity, size } = product;

        const foundProduct = await Product.getProductById(productId);
        if (!foundProduct) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        const sizeToUpdate = foundProduct.details.find(detail => detail.size === size);
        if (!sizeToUpdate) {
            throw new Error(`Size ${size} not available for product ${foundProduct.name}.`);
        }

        if (sizeToUpdate.quantityInStock < quantity) {
            throw new Error(`Insufficient quantity in stock for product ${foundProduct.name}, size ${size}.`);
        }

        sizeToUpdate.quantityInStock -= quantity;

        await foundProduct.save();

        totalPrice += foundProduct.price * quantity;
    }

    order.totalPrice = totalPrice;
    const savedOrder = await order.save();
     const updatedUser = await User.updateUser(savedOrder.user, {$push: {orders: savedOrder._id}}, {new: true})
    console.log(updatedUser);
    return savedOrder;
};

const updateOrder = async (orderId, order) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, order, { new: true });
        if (!updatedOrder) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }
        return updatedOrder;
    } catch (e) {
        console.log("OrderService:" + e);
    }
    }
const getAllOrders = async () => {
    try {
        const orders = await Order.find();
        if (orders)
            return orders;
    } catch (e) {
        console.log("OderService:" + e);

    }
};

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        console.log(`Order with ID ${orderId} not found.`);
    }
    return order;
};

const deleteOrder = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
        console.log(`Order with ID ${orderId} not found.`);
    }
    return order;
}

const filterOrders = async (filter) => {
    try {
        const orders = await Order.find(filter);
        if (orders.length > 0)
            return orders;
    } catch (e) {
        console.log("OderService:" + e);

    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    filterOrders
}
