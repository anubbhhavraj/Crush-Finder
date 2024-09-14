const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/auth/instagram', authController.authInstagram);
router.get('/auth/instagram/callback', authController.authInstagramCallback);

module.exports = router;
