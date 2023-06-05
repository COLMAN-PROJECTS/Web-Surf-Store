const Product = require('../models/ProductSchema');

const createProduct = async (name, description, price, image, category, brand) => {
    const product = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand
    });

    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, name, description, price, image, category, brand) => {
    const product = await Product.findById(id);
    if (!product) {
        return null;
    }

    if (name) {
        product.name = name;
    }
    if (description) {
        product.description = description;
    }
    if (price) {
        product.price = price;
    }
    if (image) {
        product.image = image;
    }
    if (category) {
        product.category = category;
    }
    if (brand) {
        product.brand = brand;
    }

    return await product.save();
};

const deleteProduct = async (id) => {
    if (!await Product.findById(id)) {
        return null;
    }

    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
