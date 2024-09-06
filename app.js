require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', async (req, res) => {
    const { collegeName, userName, crushName } = req.body;
    const user = userName.toUpperCase();
    const crush = crushName.toUpperCase();
    const college =collegeName.toUpperCase();
    let existingUser = await User.findOne({ collegeName:college, userName: crush, crushName: user });
    
    if (existingUser) {
        res.render('result', { message: `Crush Found! ${existingUser.userName} also likes you!` });
    } else {
        const newUser = new User({
            collegeName:college,
            userName: user,
            crushName: crush
        });
        await newUser.save();
        res.render('result', { message: 'Your crush has been saved! Hopefully, they like you back.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
