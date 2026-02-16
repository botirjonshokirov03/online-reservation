const mongoose = require('mongoose');

const sectionPricingSchema = new mongoose.Schema({
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sectionName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableTickets: {
        type: Number,
        required: true,
    },
    soldTickets: {
        type: Number,
        default: 0,
    },
});

const ceremonySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a ceremony title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image'],
        },
        date: {
            type: Date,
            required: [true, 'Please provide a ceremony date'],
        },
        time: {
            type: String,
            required: [true, 'Please provide a ceremony time'],
        },
        location: {
            type: String,
            required: [true, 'Please provide a location'],
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Venue',
            required: [true, 'Please select a venue'],
        },
        sectionPricing: [sectionPricingSchema],
        maxAttendees: {
            type: Number,
            required: [true, 'Please provide maximum attendees'],
        },
        currentAttendees: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
            default: 'upcoming',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Ceremony', ceremonySchema);

