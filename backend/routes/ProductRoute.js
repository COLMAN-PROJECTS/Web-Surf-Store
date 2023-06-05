const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Create a new product
router.post('/', async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;

    try {
        const product = await createProduct(name, description, price, image, category, brand);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the product.' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await getProductById(id);
        if (!product) {
            res.status(404).json({ error: 'Product not found.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the product.' });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category, brand } = req.body;

    try {
        const updatedProduct = await updateProduct(id, name, description, price, image, category, brand);
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found.' });
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product.' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await deleteProduct(id);
        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found.' });
        } else {
            res.json(deletedProduct);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the product.' });
    }
});

module.exports = router;
