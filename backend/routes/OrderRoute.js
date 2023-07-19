const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAdminMiddleWare = require('../middlewares/isAdminMiddleWare');

router.get('/', isAdminMiddleWare, orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.patch('/', orderController.updateOrder)
router.delete('/', isAdminMiddleWare, orderController.deleteOrder);
router.post('/filter',isAdminMiddleWare, orderController.filterOrders)
router.get('/groupBy/:field',isAdminMiddleWare, orderController.groupByField);


module.exports = router;