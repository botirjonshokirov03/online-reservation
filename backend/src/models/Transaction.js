const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ceremony: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ceremony',
            required: true,
        },
        tickets: [
            {
                ticket: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Ticket',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled', 'refunded'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'cash', 'online'],
            default: 'online',
        },
        transactionId: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.pre('save', function (next) {
    if (this.isNew && !this.transactionId) {
        this.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
