const Product = require('../models/ProductSchema');
const createProduct = async (product) => {
    try {
        const newProduct = await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            frontImage: product.frontImage,
            category: product.category,
            brand: product.brand,
            details: [...product.details],
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

    const updateProduct = async (product) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});
            if (!updatedProduct) {
                console.log("Product not found");
            }
            else
                return updatedProduct;

        }catch (error) {
            throw  new Error("Error in updating product");
        }
    };



const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            console.log("Error: Product not found");
            return null;
        }
        console.log(product)
        return product;
    } catch (error) {
        console.error("Error in deleting product:", error);
        throw new Error("Error in deleting product");
    }
};


const filterProducts = async (filter) => {
    try {
        const {product} = filter;
        return await Product.find(product);
    }catch (error) {
        throw  new Error("Error in filtering products");
    }
}



module.exports = {
        createProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        filterProducts
    };
