require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes'); // Add the policy routes

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy
passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ instagramId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      instagramId: profile.id,
      username: profile.username,
      accessToken,
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/', policyRoutes); // Add policy routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
