const Order = require('../models/OrderSchema'); // Assuming you have defined the Order schema
const Product = require('./ProductService'); // Assuming you have defined the Product schema


const createOrder = async (orderData) => {
    // Create the order
    const order = new Order({
        user: orderData.user,
        products: [...orderData.products],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
    });

    let totalPrice = 0;

    // Update product quantities
    for (const product of order.products) {
        const { product: productId, quantity, size } = product;

        // Find the product by ID
        const foundProduct = await Product.getProductById(productId);
        if (!foundProduct) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        // Find the specific size in the product's details array
        const sizeToUpdate = foundProduct.details.find(detail => detail.size === size);
        if (!sizeToUpdate) {
            throw new Error(`Size ${size} not available for product ${foundProduct.name}.`);
        }

        // Check if there are enough quantities in stock
        if (sizeToUpdate.quantityInStock < quantity) {
            throw new Error(`Insufficient quantity in stock for product ${foundProduct.name}, size ${size}.`);
        }

        // Update the quantity in stock
        sizeToUpdate.quantityInStock -= quantity;

        // Save the updated product
        await foundProduct.save();

        // Calculate the price for this product and quantity
        totalPrice += foundProduct.price * quantity;
    }

    order.totalPrice = totalPrice;

    // Save the order
    const savedOrder = await order.save();
    return savedOrder;
};

const updateOrder = async (orderId, order) => {
    try {
        // Find the order by ID and update it
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
        // Retrieve all orders
        const orders = await Order.find();
        if (orders)
            return orders;
    } catch (e) {
        console.log("OderService:" + e);

    }
};

const getOrderById = async (orderId) => {
    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
        console.log(`Order with ID ${orderId} not found.`);
    }
    return order;
};

const deleteOrder = async (orderId) => {
    // Find the order by ID
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
        console.log(`Order with ID ${orderId} not found.`);
    }
    return order;
}

const filterOrders = async (filter) => {
    try {
        // Retrieve all orders that match the filter
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
