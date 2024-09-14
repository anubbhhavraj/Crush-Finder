require('dotenv').config();


const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../models/user');

// Setup Instagram Authentication Strategy
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
    // Find or Create User
    try {
        let user = await User.findOne({ instagramId: profile.id });
        if (!user) {
            user = new User({
                instagramId: profile.id,
                username: profile.username,
                name: profile.displayName,
                age: null, // Ask for age after login
            });
            await user.save();
        }
       
        return done(null, profile);
    } catch (err) {
        done(err, null);
    }
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

// Redirect to Instagram Login
exports.loginWithInstagram = passport.authenticate('instagram');

// Instagram Callback
exports.instagramCallback = passport.authenticate('instagram', {
    failureRedirect: '/',
    successRedirect: '/profile'
});
