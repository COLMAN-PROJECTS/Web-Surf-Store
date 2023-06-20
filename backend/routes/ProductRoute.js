const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/',productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id',productController.getProductById);
router.patch('/',productController.updateProduct)
router.delete('/', productController.deleteProduct);


module.exports = router;
