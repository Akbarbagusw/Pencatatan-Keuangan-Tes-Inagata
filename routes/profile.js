const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');

router.put('/profile', authMiddleware, profileController.updateProfile);
router.get('/profile', authMiddleware, profileController.getLoggedInProfile);

module.exports = router;
