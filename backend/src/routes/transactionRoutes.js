const express = require('express');
const {
    createTransaction,
    getUserTransactions,
    getTransactionById,
    getAllTransactions,
    updateTransactionStatus,
} = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, createTransaction)
    .get(protect, admin, getAllTransactions);

router.get('/my-transactions', protect, getUserTransactions);

router.route('/:id')
    .get(protect, getTransactionById)
    .put(protect, admin, updateTransactionStatus);

module.exports = router;
