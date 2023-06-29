const User = require("../models/UserSchema");
const Order = require("../models/OrderSchema");
const Product = require("../models/ProductSchema");

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).select('-password').populate('orders')
        .populate({
            path: 'orders',
            populate: {
                path: 'products.product',
                model: Product,
            },
        });
    return user;
};

const getUserById = async (id) => {
    const user = await User.findById(id).populate('orders').populate({
        path: 'orders.products',
        model: Product
    });
    return user;
};

const getAllUsers = async () => {
    try {
        const users = await User.find().populate('orders').populate({
            path: 'orders.products',
            model: Product
        });
        if (users) {
            return users;
        }
    } catch (err) {
        console.log(err);
    }
};

const updateUser = async (id, updatedFields) => {
    try {
        console.log(id, updatedFields);
        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {new: true});
        if (updatedUser) {
            return updatedUser;
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            return deletedUser;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUserByEmail,
    getUserById,
    updateUser,
    getAllUsers,
    deleteUser,
};