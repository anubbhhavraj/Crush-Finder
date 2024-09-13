const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {instagramCallback,instagramLogin,loginPage} =require('../controllers/authController');

router.get('/', loginPage);
router.get('/instagram', instagramLogin);
router.get('/instagram/callback', instagramCallback);

module.exports = router;