const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const UserService = require("../services/UserService");
const authMiddleware = require("../middlewares/auth");
const initializePassport = require("../config/passport-config");
const router = express.Router();

initializePassport(
    passport,
    (email) => User.findOne({email}),
    (id) => User.findOne({_id: id})).then(r => console.log("Passport initialized"));

router.get("/", authMiddleware.checkAuthenticated, (req, res) => {
    res.sendFile("frontend/index.html")
});

router.get("/login", authMiddleware.checkNotAuthenticated, (req, res) => {
    res.sendStatus(200)
});

router.post(
    "/loginReq",
    authMiddleware.validateLogin,
    passport.authenticate("local"),
    async (req, res) => {
        const user = await UserService.getUserByEmail(req.body.email);
        console.log(user);
        res.status(200).json(user);}
);

router.get("/register", authMiddleware.checkNotAuthenticated, (req, res) => {
    //TODO: path to register page
});

router.post(
    "/register",
    authMiddleware.validateFields,
    async (req, res) => {
        try {
            const {fullName, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            });
            await user.save();
            res.redirect("/login");
        } catch {
            res.redirect("/register");
        }
    }
);

router.delete("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});

module.exports = router;