const User = require('../models/User');

// Render the questions page
exports.getQuestions = (req, res) => {
  res.render('questions');
};

// Handle user responses
exports.postQuestions = (req, res) => {
  const { collegeName, hobbies } = req.body;
  User.findByIdAndUpdate(req.user._id, { collegeName, hobbies }, { new: true }, (err, user) => {
    if (err) return res.redirect('/');
    res.redirect('/user/main');
  });
};

// Render main page
exports.getMainPage = (req, res) => {
  res.render('main', { user: req.user });
};

// Crush finder logic
exports.findCrush = (req, res) => {
  const { crushUsername } = req.body;
  User.findOne({ username: crushUsername }, (err, crush) => {
    if (err || !crush) {
      return res.render('results', { message: 'No match found', commonLikes: [], compatibility: 0 });
    }
    const commonLikes = req.user.likes.filter(like => crush.likes.includes(like));
    const compatibility = (commonLikes.length / req.user.likes.length) * 100;
    res.render('results', { message: 'Match found!', commonLikes, compatibility });
  });
};
