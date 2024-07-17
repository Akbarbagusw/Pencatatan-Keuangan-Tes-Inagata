const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/auth');

router.post('/pencatatan', authMiddleware, transactionController.addTransaction);
router.put('/pencatatan', authMiddleware, transactionController.updateTransaction);

module.exports = router;
