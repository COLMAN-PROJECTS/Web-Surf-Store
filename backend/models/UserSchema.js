const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true ,unique: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: 0},
    isAdmin: {
        type: Boolean,
        default: false,
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
