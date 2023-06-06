const User = require('../models/UserSchema');

const createUser = async (username, email, password, address, phoneNumber) => {
    const user = new User({
        username: username,
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber
    });

    return await user.save();
};

const getAllUsers = async () => {
    return await User.find();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUser = async (id, username, email, password, address, phoneNumber) => {
    const user = await User.findById(id);
    if (!user) {
        return null;
    }

    if (username) {
        user.username = username;
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.password = password;
    }
    if (address) {
        user.address = address;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }

    return await user.save();
};

const deleteUser = async (id, role) => {
    if (role !== 'manager') {
        // Unauthorized access, return an error or handle it accordingly
        return { error: 'Unauthorized access: Only managers are allowed to delete users.' };
    }

    if (!await User.findById(id)) {
        return null;
    }

    return await User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
