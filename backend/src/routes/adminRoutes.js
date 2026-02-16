const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserDetails,
    getDashboardStats,
} = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

router.get('/users', adminAuth, getAllUsers);
router.get('/users/:id', adminAuth, getUserDetails);
router.get('/stats', adminAuth, getDashboardStats);

module.exports = router;
