const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/UserController');

// Middleware to validate if the user is a manager
const managerValidationMiddleware = (req, res, next) => {
    const { user } = req;
    if (user.role !== 'manager') {
        return res.status(403).json({ error: 'Access denied. Only managers are allowed.' });
    }
    next();
};

// Create a new user (customer or manager)
router.post('/', async (req, res) => {
    const { username, email, password, address, phoneNumber, role } = req.body;

    try {
        const user = await createUser(username, email, password, address, phoneNumber, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the user.' });
    }
});

// Get all users (requires manager role)
router.get('/', managerValidationMiddleware, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the user.' });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, address, phoneNumber } = req.body;

    try {
        const updatedUser = await updateUser(id, username, email, password, address, phoneNumber);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the user.' });
    }
});


// Delete a user (requires manager role)
router.delete('/:id', managerValidationMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the user.' });
    }
});

module.exports = router;
