const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAdmin = require('../middlewares/isAdminMiddleWare');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.patch('/', orderController.updateOrder)
router.delete('/', orderController.deleteOrder);
router.post('/filter', orderController.filterOrders)
router.get('/groupBy/:field', orderController.groupByField);


module.exports = router;