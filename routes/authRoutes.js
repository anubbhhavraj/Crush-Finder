const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.get('/', (req, res) => {
    res.render('index'); // This will render the index.ejs file in your views directory
  });
router.get('/auth/instagram', authController.authInstagram);
router.get('/auth/instagram/callback', authController.authInstagramCallback);

module.exports = router;
