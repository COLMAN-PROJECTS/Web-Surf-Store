const userService = require("../services/UserService");


const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = (await userService.getUserById(id))
    res.send(user);
};

const getUserByEmail = async (req, res, next) => {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email)
    if (user) {
        res.send(user);
    } else {
        res.send(null);
    }
};

const getAllUsers = async (req, res, next) => {
    const users = await userService.getAllUsers()
    res.send(users);
};

const updateUser = async (req, res, next) => {
    const { id, user } = req.body;
    const updatedUser = await userService.updateUser(id, user);
    if (!updatedUser) {
        res.status(400).json({ error: "Invalid email format." });
    }
    res.send(updatedUser);
};

const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    const user = await userService.deleteUser(id);
    res.send(user);
};

module.exports = {
    updateUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    deleteUser,
};