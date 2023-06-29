const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userServices = require("../services/UserService");

async function initialize(passport, email, id) {
    const authenticateUser = async (email, password, done) => {
        console.log("email: " + email);
        const user = await userServices.getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, userServices.getUserById(id));
    });
}

module.exports = initialize;