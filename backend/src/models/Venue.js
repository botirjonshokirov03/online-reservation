const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        default: '#6366f1',
    },
});

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a venue name'],
            trim: true,
        },
        type: {
            type: String,
            enum: ['stadium', 'theater', 'palace', 'arena', 'hall'],
            required: [true, 'Please provide a venue type'],
        },
        location: {
            type: String,
            required: [true, 'Please provide a location'],
        },
        description: {
            type: String,
            default: '',
        },
        totalCapacity: {
            type: Number,
            required: [true, 'Please provide total capacity'],
        },
        sections: [sectionSchema],
        image: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'maintenance'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Venue', venueSchema);
