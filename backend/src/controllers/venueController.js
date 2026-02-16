const Venue = require('../models/Venue');

const createVenue = async (req, res) => {
    try {
        const venue = await Venue.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllVenues = async (req, res) => {
    try {
        const { type, status } = req.query;
        const filter = {};

        if (type) filter.type = type;
        if (status) filter.status = status;

        const venues = await Venue.find(filter).sort({ createdAt: -1 });
        res.status(200).json(venues);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);

        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.status(200).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.status(200).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);

        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
};
