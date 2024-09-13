const User = require('../models/User');

const profile = (req, res) => {
    if (req.session.username) {
        res.render('profile', { username: req.session.username });
    } else {
        res.redirect('/');
    }
};

const register = (req, res) => {
    if (req.session.username) {
        res.render('register', { username: req.session.username });
    } else {
        res.redirect('/');
    }
};

const registerUser = async (req, res) => {
    const { collegeName } = req.body;
    const userName = req.session.username;

    const college = collegeName.toUpperCase();

    let existingUser = await User.findOne({ collegeName: college, userName: userName });

    if (existingUser) {
        res.render('result', { message: `Crush Found! ${existingUser.userName} also likes you!` });
    } else {
        const newUser = new User({
            collegeName: college,
            userName: userName,
            crushName: ''
        });
        await newUser.save();
        res.render('result', { message: 'Your details have been saved! Hopefully, someone likes you back.' });
    }
};

module.exports = {
    profile,
    register,
    registerUser
};
