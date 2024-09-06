const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    userName: { type: String, required: true },
    crushName: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);