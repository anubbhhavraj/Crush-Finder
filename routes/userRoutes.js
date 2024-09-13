const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.profile);
router.get('/register', userController.register);
router.post('/register', userController.registerUser);

module.exports = router;
