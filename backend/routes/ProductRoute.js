const express = require("express");
const productController = require('../controllers/ProductController');
const isAdmin = require('../middlewares/isAdminMiddleWare');
const router = express.Router();

router.get('/',productController.getAllProducts);
router.post('/', isAdmin,  productController.createProduct);
router.get('/:id',productController.getProductById);
router.patch('/',isAdmin, productController.updateProduct)
router.delete('/',isAdmin, productController.deleteProduct);
router.post('/filter', productController.filterProducts)
router.get('/groupBy/:field', productController.groupBy);



module.exports = router;
