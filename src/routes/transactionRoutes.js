const express = require('express');
const router = express.Router();

// Import your controller functions here
const transactionController = require('../controllers/transactionController');

// Define routes
router.post('/transactions', transactionController.createTransaction );
router.get('/transactions', transactionController.getAllTransactions );
router.get('/transactions/:id',  transactionController.getTransactionById );
router.put('/transactions/:id',  transactionController.updateTransactionById );
router.delete('/transactions/:id',  transactionController.deleteTransactionById );
router.get('/summary',  transactionController.getSummary );

module.exports = router;
