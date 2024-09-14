const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Questions route
router.get('/questions', userController.getQuestions);
router.post('/questions', userController.postQuestions);

// Main page route
router.get('/main', userController.getMainPage);
router.post('/findCrush', userController.findCrush);

module.exports = router;
