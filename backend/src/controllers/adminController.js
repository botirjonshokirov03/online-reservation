const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Ceremony = require('../models/Ceremony');
const Ticket = require('../models/Ticket');

const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const users = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        res.status(200).json({
            users,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalUsers: total,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transactions = await Transaction.find({ user: req.params.id })
            .populate('ceremony', 'title date')
            .sort({ createdAt: -1 })
            .limit(10);

        const tickets = await Ticket.find({ user: req.params.id })
            .populate('ceremony', 'title date')
            .sort({ createdAt: -1 });

        res.status(200).json({
            user,
            transactions,
            tickets,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCeremonies = await Ceremony.countDocuments();
        const totalTickets = await Ticket.countDocuments();
        const totalRevenue = await Transaction.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const recentTransactions = await Transaction.find()
            .populate('user', 'name email')
            .populate('ceremony', 'title')
            .sort({ createdAt: -1 })
            .limit(5);

        const upcomingCeremonies = await Ceremony.find({ status: 'upcoming' })
            .populate('venue', 'name type')
            .sort({ date: 1 })
            .limit(5);

        res.status(200).json({
            stats: {
                totalUsers,
                totalCeremonies,
                totalTickets,
                totalRevenue: totalRevenue[0]?.total || 0,
            },
            recentTransactions,
            upcomingCeremonies,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserDetails,
    getDashboardStats,
};
