const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');


router.get('/', (req, res) => {
    res.render('index'); 
  });
  router.post('/auth/instagram/deauthorize', (req, res) => {
     
 
    console.log('User deauthorized:', req.body);
    res.sendStatus(200);  
  });
  router.post('/auth/instagram/delete', (req, res) => {
   
    console.log('Data deletion request received:', req.body);
   
    res.json({
      url: 'https://crushfinder-gtfz.onrender.com/privacy-policy',  
      confirmation_code: 'unique_confirmation_code'  
    });
  });
router.get('/auth/instagram', authController.authInstagram);
router.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');  // Redirect to profile page on successful authentication
  }
);


module.exports = router;
