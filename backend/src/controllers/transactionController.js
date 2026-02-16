const Transaction = require('../models/Transaction');
const Ticket = require('../models/Ticket');
const Ceremony = require('../models/Ceremony');

const createTransaction = async (req, res) => {
    try {
        const { ceremony, tickets, paymentMethod } = req.body;

        const ceremonyExists = await Ceremony.findById(ceremony);
        if (!ceremonyExists) {
            return res.status(404).json({ message: 'Ceremony not found' });
        }

        let totalAmount = 0;
        const ticketItems = [];

        for (const item of tickets) {
            const ticket = await Ticket.findById(item.ticket);

            if (!ticket) {
                return res.status(404).json({ message: `Ticket ${item.ticket} not found` });
            }

            if (ticket.availableQuantity < item.quantity) {
                return res.status(400).json({
                    message: `Not enough tickets available for ${ticket.type}. Available: ${ticket.availableQuantity}`
                });
            }

            ticket.availableQuantity -= item.quantity;
            await ticket.save();

            totalAmount += ticket.price * item.quantity;
            ticketItems.push({
                ticket: ticket._id,
                quantity: item.quantity,
                price: ticket.price,
            });
        }

        ceremonyExists.currentAttendees += tickets.reduce((sum, item) => sum + item.quantity, 0);
        await ceremonyExists.save();

        const transaction = await Transaction.create({
            user: req.user._id,
            ceremony,
            tickets: ticketItems,
            totalAmount,
            paymentMethod,
            status: 'completed',
        });

        const populatedTransaction = await Transaction.findById(transaction._id)
            .populate('user', 'name email')
            .populate('ceremony', 'title date location')
            .populate('tickets.ticket', 'type section row');

        res.status(201).json(populatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .populate('ceremony', 'title date location image')
            .populate('tickets.ticket', 'type section row')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('ceremony', 'title date location image')
            .populate('tickets.ticket', 'type section row');

        if (transaction) {
            if (transaction.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to view this transaction' });
            }
            res.json(transaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate('user', 'name email')
            .populate('ceremony', 'title date')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTransactionStatus = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (transaction) {
            transaction.status = req.body.status || transaction.status;
            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
    getTransactionById,
    getAllTransactions,
    updateTransactionStatus,
};
