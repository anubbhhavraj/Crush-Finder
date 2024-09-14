const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    instagramId: String,
    username: String,
    name: String,
    age: Number,
    college: String,
    hobbies: [String],
    crushUsername: String,
    broUsername: String,
    compatibility: Number,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
