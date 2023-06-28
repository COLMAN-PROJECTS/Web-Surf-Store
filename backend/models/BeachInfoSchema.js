const mongoose = require('mongoose');
const { Schema } = mongoose;

const BeachInfoSchema = new Schema({
    spot: {type: String, required: true},
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    description: {type: String, required: true},
    video: {type: String, required: true}
})

const BeachInfo = mongoose.model('BeachInfo', BeachInfoSchema);

module.exports = BeachInfo;

