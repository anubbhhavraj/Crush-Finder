const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Privacy Policy route
router.get('/privacy-policy', policyController.getPrivacyPolicy);

module.exports = router;
