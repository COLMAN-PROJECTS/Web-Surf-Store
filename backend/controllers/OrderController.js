const OrderService = require('../services/OrderService');


const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        console.log(orderData);
        const order = await OrderService.createOrder(orderData);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({error: 'Error creating order'});
        }
    } catch (error) {
        res.status(500).json({error:"Controller: " + error.message});
    }
};

const updateOrder = async (req, res) => {
    try {
        const {order} = req.body
        const updatedOrder = await OrderService.updateOrder(order);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({error: 'Controller: Error updating order'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getOrderById = async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await OrderService.getOrderById(orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({error: 'Order not found'});
            }
        } catch
            (error) {
            res.status(500).json({error: error.message});
        }
    }
;

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.body
        const deletedOrder = await OrderService.deleteOrder(orderId);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({error: 'Order not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const filterOrders = async (req, res) => {
    try {
        const filter = req.body;
        const filteredOrders = await OrderService.filterOrders(filter);
        res.status(200).json(filteredOrders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    filterOrders
}
