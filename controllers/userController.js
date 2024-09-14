require('dotenv').config();
const User = require('../models/user');
// Collect Profile Info (College, Hobbies)
exports.collectProfileInfo = async (req, res) => {
    const { college, hobbies } = req.body;
    try {
        await User.findByIdAndUpdate(req.user._id, {
            college: college,
            hobbies: hobbies.split(',').map(hobby => hobby.trim()),
        });
        res.redirect('/mainpage');
    } catch (err) {
        console.error(err);
        res.redirect('/profile');
    }
};

// Crush Finder Logic
exports.crushFinder = async (req, res) => {
    const { crushUsername } = req.body;
    const user = await User.findById(req.user._id);
    
    // Find the crush in the database
    const crush = await User.findOne({ username: crushUsername });
    
    if (crush) {
        // Check if the crush also has you as their crush
        const isMutual = (crush.crushUsername === user.username);
        
        // Calculate compatibility (example: hobbies match percentage)
        const sharedHobbies = user.hobbies.filter(hobby => crush.hobbies.includes(hobby));
        const compatibility = (sharedHobbies.length / user.hobbies.length) * 100;

        res.render('result', { 
            name: crush.name, 
            isMutual, 
            compatibility, 
            sharedHobbies 
        });
    } else {
        // Crush not found
        res.render('result', { name: null });
    }
};

// Bro Finder Logic (similar to crush finder)
exports.broFinder = async (req, res) => {
    const { broUsername } = req.body;
    const user = await User.findById(req.user._id);
    
    const bro = await User.findOne({ username: broUsername });
    
    if (bro) {
        const sharedHobbies = user.hobbies.filter(hobby => bro.hobbies.includes(hobby));
        const compatibility = (sharedHobbies.length / user.hobbies.length) * 100;

        res.render('result', { 
            name: bro.name, 
            compatibility, 
            sharedHobbies 
        });
    } else {
        res.render('result', { name: null });
    }
};
