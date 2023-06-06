const userService = require('../services/userService');


// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password, address, phoneNumber } = req.body;
        const user = await userService.createUser(username, email, password, address, phoneNumber);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the user.' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the user.' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password, address, phoneNumber } = req.body;
        const updatedUser = await userService.updateUser(userId, username, email, password, address, phoneNumber);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the user.' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await userService.deleteUser(userId);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the user.' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
