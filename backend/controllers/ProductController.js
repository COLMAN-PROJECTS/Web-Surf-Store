const productService = require('../services/productService');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, brand } = req.body;
        const product = await productService.createProduct(name, description, price, image, category, brand);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the product.' });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the product.' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, image, category, brand } = req.body;
        const updatedProduct = await productService.updateProduct(productId, name, description, price, image, category, brand);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product.' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the product.' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
