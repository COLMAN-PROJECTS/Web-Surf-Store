const passport = require("passport");
const bcrypt = require("bcrypt");

/**
 * @details Middleware to check if user is authenticated
 */
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

/**
 * @details Middleware to check if user is not authenticated
 */
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(401).json({ error: "User is not authenticated" });
}

/**
 * @details Middleware to validate validateLogin
 */
function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "Missing email and/or password" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ error: "Invalid email format" });
  }
  req.session.user = { email: email, password: password };
  // TODO: remove after testing
  console.log("validation success:" + JSON.stringify(req.session.user));
  next();
}

/**
 * @details Middleware to validate fields
 */
function validateFields(req, res, next) {
  const { fullName, email, password } = req.body;
  console.log(req.body)
  console.log(fullName, email, password)
  if (!fullName || !email || !password) {
    return res.json({ error: "Missing fields" });
  }

  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  if (!nameRegex.test(fullName)) {
    return res.json({ error: "Invalid name format" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ error: "Invalid email format" });
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  validateLogin,
  validateFields,
};