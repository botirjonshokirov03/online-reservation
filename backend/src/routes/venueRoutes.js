const express = require('express');
const router = express.Router();
const {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
} = require('../controllers/venueController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', adminAuth, createVenue);
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.put('/:id', adminAuth, updateVenue);
router.delete('/:id', adminAuth, deleteVenue);

module.exports = router;
