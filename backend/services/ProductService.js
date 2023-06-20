const Product = require('../models/ProductSchema');
const createProduct = async (product) => {
    try {
        const newProduct = await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            frontImage: product.frontImage,
            category: product.category,
            details: product.details,
            images: product.images
        });

        const DB_product = await newProduct.save();
        if(DB_product)
        {
            return DB_product;
        }
    }
        catch(error){
            console.log("Error(Service):" + error );
        }
   
    };

    const getAllProducts = async () => {
        try {

            return await Product.find();
        }catch (error) {
            throw  new Error("Error in getting all products");
        }
    };

    const getProductById = async (_id) => {
        try {
            return await Product.findById(_id);
        }catch (error) {
            throw  new Error("Error in getting product by id");
    }};

    const updateProduct = async (_id, name, description, price, frontImage, category, details, images) => {
        try {
            const product = await Product.findById(_id);
            if (!product) {
                throw new Error("Product not found");
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
            if (frontImage) {
                product.frontImage = frontImage;
            }
            if (category) {
                product.category = category;
            }
            if (details) {
                product.details.brand = details.brand;
                product.details.size = details.size;
            }
            if (images) {
                product.images = images;
            }

            return await product.save();
        }catch (error) {
            throw  new Error("Error in updating product");
        }
    };

    const deleteProduct = async (id) => {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error("Product not found");
            }

            return await product.remove();
        }catch (error) {
            throw  new Error("Error in deleting product");
        }
    };

    module.exports = {
        createProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct
    };
