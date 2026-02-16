const express = require('express');
const {
    createTicket,
    getTicketsByCeremony,
    getTicketById,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, admin, createTicket);
router.get('/ceremony/:ceremonyId', getTicketsByCeremony);
router.route('/:id')
    .get(getTicketById)
    .put(protect, admin, updateTicket)
    .delete(protect, admin, deleteTicket);

module.exports = router;
