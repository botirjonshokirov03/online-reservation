const Ticket = require('../models/Ticket');
const Ceremony = require('../models/Ceremony');

const createTicket = async (req, res) => {
    try {
        const { ceremony, type, price, totalQuantity, section, row, benefits } = req.body;

        const ceremonyExists = await Ceremony.findById(ceremony);
        if (!ceremonyExists) {
            return res.status(404).json({ message: 'Ceremony not found' });
        }

        const ticket = await Ticket.create({
            ceremony,
            type,
            price,
            totalQuantity,
            availableQuantity: totalQuantity,
            section,
            row,
            benefits,
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketsByCeremony = async (req, res) => {
    try {
        const tickets = await Ticket.find({ ceremony: req.params.ceremonyId }).populate('ceremony', 'title date');

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('ceremony', 'title date location');

        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (ticket) {
            ticket.type = req.body.type || ticket.type;
            ticket.price = req.body.price || ticket.price;
            ticket.totalQuantity = req.body.totalQuantity || ticket.totalQuantity;
            ticket.availableQuantity = req.body.availableQuantity !== undefined ? req.body.availableQuantity : ticket.availableQuantity;
            ticket.section = req.body.section || ticket.section;
            ticket.row = req.body.row || ticket.row;
            ticket.benefits = req.body.benefits || ticket.benefits;

            const updatedTicket = await ticket.save();
            res.json(updatedTicket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (ticket) {
            await ticket.deleteOne();
            res.json({ message: 'Ticket removed' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    getTicketsByCeremony,
    getTicketById,
    updateTicket,
    deleteTicket,
};
