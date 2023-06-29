const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAdmin = require('../middlewares/isAdminMiddleWare');

router.get('/',isAdmin, orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id',isAdmin, orderController.getOrderById);
router.patch('/',isAdmin, orderController.updateOrder)
router.delete('/',isAdmin, orderController.deleteOrder);
router.post('/filter', orderController.filterOrders)
router.get('/groupBy/:field', orderController.groupByField);


module.exports = router;