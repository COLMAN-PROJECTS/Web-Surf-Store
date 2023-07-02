const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userServices = require("../services/UserService");

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        console.log("email: " + email);
        const user = await userServices.getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }

        console.log("password: " + password);
        console.log("user.password: " + user.password);

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("isMatch: " + isMatch);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userServices.getUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initialize;
