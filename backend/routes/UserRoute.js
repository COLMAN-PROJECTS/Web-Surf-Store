const express = require("express");
const userController = require('../controllers/UserController');
const isAdmin = require('../middlewares/isAdminMiddleWare');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get("/",isAdmin, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/email/:email", userController.getUserByEmail);
router.patch("/update",isAdmin, userController.updateUser);
router.delete("/delete",isAdmin, userController.deleteUser);

module.exports = router;