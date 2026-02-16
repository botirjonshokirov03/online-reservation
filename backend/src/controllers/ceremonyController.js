const Ceremony = require('../models/Ceremony');
const Ticket = require('../models/Ticket');

const createCeremony = async (req, res) => {
    try {
        const { title, description, image, date, time, location, maxAttendees } = req.body;

        const ceremony = await Ceremony.create({
            title,
            description,
            image,
            date,
            time,
            location,
            maxAttendees,
            createdBy: req.user._id,
        });

        res.status(201).json(ceremony);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCeremonies = async (req, res) => {
    try {
        const ceremonies = await Ceremony.find({}).populate('createdBy', 'name email').sort({ date: 1 });
        res.json(ceremonies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCeremonyById = async (req, res) => {
    try {
        const ceremony = await Ceremony.findById(req.params.id).populate('createdBy', 'name email');

        if (ceremony) {
            res.json(ceremony);
        } else {
            res.status(404).json({ message: 'Ceremony not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCeremony = async (req, res) => {
    try {
        const ceremony = await Ceremony.findById(req.params.id);

        if (ceremony) {
            ceremony.title = req.body.title || ceremony.title;
            ceremony.description = req.body.description || ceremony.description;
            ceremony.image = req.body.image || ceremony.image;
            ceremony.date = req.body.date || ceremony.date;
            ceremony.time = req.body.time || ceremony.time;
            ceremony.location = req.body.location || ceremony.location;
            ceremony.maxAttendees = req.body.maxAttendees || ceremony.maxAttendees;
            ceremony.status = req.body.status || ceremony.status;

            const updatedCeremony = await ceremony.save();
            res.json(updatedCeremony);
        } else {
            res.status(404).json({ message: 'Ceremony not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCeremony = async (req, res) => {
    try {
        const ceremony = await Ceremony.findById(req.params.id);

        if (ceremony) {
            await Ticket.deleteMany({ ceremony: ceremony._id });
            await ceremony.deleteOne();
            res.json({ message: 'Ceremony and associated tickets removed' });
        } else {
            res.status(404).json({ message: 'Ceremony not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUpcomingCeremonies = async (req, res) => {
    try {
        const ceremonies = await Ceremony.find({
            status: 'upcoming',
            date: { $gte: new Date() },
        })
            .populate('createdBy', 'name email')
            .sort({ date: 1 })
            .limit(10);

        res.json(ceremonies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCeremony,
    getAllCeremonies,
    getCeremonyById,
    updateCeremony,
    deleteCeremony,
    getUpcomingCeremonies,
};
