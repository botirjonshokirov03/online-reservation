const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        ceremony: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ceremony',
            required: true,
        },
        type: {
            type: String,
            required: [true, 'Please provide a ticket type'],
            enum: ['fan-zone', 'balcony', 'vip', 'standard'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a ticket price'],
            min: 0,
        },
        totalQuantity: {
            type: Number,
            required: [true, 'Please provide total quantity'],
            min: 1,
        },
        availableQuantity: {
            type: Number,
            required: true,
        },
        section: {
            type: String,
            default: '',
        },
        row: {
            type: String,
            default: '',
        },
        benefits: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

ticketSchema.pre('save', function (next) {
    if (this.isNew && !this.availableQuantity) {
        this.availableQuantity = this.totalQuantity;
    }
    next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
