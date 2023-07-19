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
    const user = req.session.user;
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
        try {
            const user = await UserService.getUserByEmail(req.body.email);
            req.login(user, (err) => {

                if (err) {
                    console.error("Error saving user to session:", err);
                    return res.status(500).json({error: "Internal server error"});
                }

                res.cookie("connect.sid", req.session.id, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 1000 * 60 * 60 * 24
                }).status(200).json(user)
            });
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
);

router.get("/register", authMiddleware.checkNotAuthenticated, (req, res) => {
});

router.post(
    "/register",
    authMiddleware.validateFields,
    async (req, res) => {
        try {
            const {email, password, phone, fullName, address} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email: email,
                password: hashedPassword,
                phone: phone,
                fullName: fullName,
                address: address,
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