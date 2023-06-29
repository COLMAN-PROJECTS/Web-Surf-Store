const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const initializePassport = require("../config/passport-config");

initializePassport(
    passport,
    (email) => User.findOne({email}),
    (id) => User.findOne({_id: id})).then(r => console.log("Passport initialized"));

router.get("/", authMiddleware.checkAuthenticated, (req, res) => {
    res.sendFile("frontend/index.html")
});

router.get("/login", authMiddleware.checkNotAuthenticated, (req, res) => {
    res.sendFile("frontend/index.html")

    //TODO: path to login page
});

router.post(
    "/loginReq",
    authMiddleware.validateLogin,
    passport.authenticate("local"),
    (req, res) => {
        console.log(req.body)
        res.sendStatus(200);
    }
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
            res.redirect("/loginReq");
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