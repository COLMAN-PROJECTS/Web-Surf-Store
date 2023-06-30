const express = require("express");
const userController = require('../controllers/UserController');
const isAdmin = require('../middlewares/isAdminMiddleWare');
const AuthRoute = require('./AuthRoute');
const router = express.Router();


router.get("/",isAdmin, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/email/:email",userController.getUserByEmail);
router.patch("/update",isAdmin, userController.updateUser);
router.delete("/delete",isAdmin, userController.deleteUser);

module.exports = router;