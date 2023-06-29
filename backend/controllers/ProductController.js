const productService = require('../services/productService');

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const {product} = req.body
        const newProduct = await productService.createProduct(product);
        if (!newProduct)
            res.send("Something went wrong");
        else
            res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({error});
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = (await productService.getProductById(productId));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({error: 'Product not found.'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Update a product
const updateProduct = async (req, res) => {
        try {
            const {product} = req.body;
            const updatedProduct = await productService.updateProduct(product);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({error: 'Controller: Product not found.'});
            }
        } catch
            (error) {
            res.status(500).json({error: error.message});
        }
    }
;

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.body;
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({error: 'Product not found.'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Filter products
const filterProducts = async (req, res) => {
    try {
        const filter = req.body;
        const products = await productService.filterProducts(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const groupBy = async (req, res) => {
    const { field } = req.params;

    try {
        const result = await productService.groupByField(field);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    filterProducts,
    groupBy
};
