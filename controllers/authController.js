const passport = require('passport');

// Redirect to Instagram for authentication
exports.authInstagram = passport.authenticate('instagram');

// Handle callback from Instagram
exports.authInstagramCallback = passport.authenticate('instagram', {
  failureRedirect: '/',
  successRedirect: '/user/questions',
});
