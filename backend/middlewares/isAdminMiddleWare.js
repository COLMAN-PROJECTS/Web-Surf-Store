const User = require('../models/UserSchema');

const isAdminMiddleware = async (req, res, next) => {

    try {
        if (req.session.passport.user._id) {
            const user = await User.findById(req.session.passport.user._id);

            if (user) {
                if (user.isAdmin) {
                    next();
                } else {
                    res.status(403).json({ error: 'Access denied. User is not an admin.' });
                }
            } else {
                res.status(401).json({ error: 'Unauthorized. User not found.' });
            }
        } else {
            res.status(401).json({ error: 'Unauthorized. User is not logged in.' });
        }
    } catch (error) {
        console.error('isAdminMiddleware error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = isAdminMiddleware;
