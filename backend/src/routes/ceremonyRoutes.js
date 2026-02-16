const express = require('express');
const {
    createCeremony,
    getAllCeremonies,
    getCeremonyById,
    updateCeremony,
    deleteCeremony,
    getUpcomingCeremonies,
} = require('../controllers/ceremonyController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getAllCeremonies)
    .post(protect, admin, createCeremony);

router.get('/upcoming', getUpcomingCeremonies);

router.route('/:id')
    .get(getCeremonyById)
    .put(protect, admin, updateCeremony)
    .delete(protect, admin, deleteCeremony);

module.exports = router;
