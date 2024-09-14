const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  instagramId: String,
  username: String,
  fullName: String,
  collegeName: String,
  hobbies: [String],
  crush: String,
  likes: [String],
});

module.exports = mongoose.model('User', userSchema);
