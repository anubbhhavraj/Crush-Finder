const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', (req, res) => res.render('profile')); // Render profile form
router.post('/profile', userController.collectProfileInfo);

router.get('/mainpage', (req, res) => res.render('mainpage', { name: req.user.name }));
router.post('/crushfinder', userController.crushFinder);
router.post('/brofinder', userController.broFinder);

module.exports = router;
