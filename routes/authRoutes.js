const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/auth/instagram', authController.instagramLogin);
router.get('/auth/instagram/callback', authController.instagramCallback);

module.exports = router;