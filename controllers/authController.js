const axios = require('axios');
const User = require('../models/User');

const instagramLogin = (req, res) => {
    const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    res.redirect(`https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`);
};

const instagramCallback = async (req, res) => {
    const code = req.query.code;

    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', null, {
            params: {
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.REDIRECT_URI,
                code: code
            }
        });

        const accessToken = response.data.access_token;

        const userResponse = await axios.get('https://graph.instagram.com/me', {
            params: {
                fields: 'username',
                access_token: accessToken
            }
        });

        const username = userResponse.data.username;
        req.session.username = username;

        let existingUser = await User.findOne({ userName: username });

        if (existingUser) {
            res.redirect('/profile');
        } else {
            res.redirect('/register');
        }
    } catch (error) {
        console.error('Instagram authentication error:', error);
        res.redirect('/');
    }
};

module.exports = {
    instagramLogin,
    instagramCallback
};
