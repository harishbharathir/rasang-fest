import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: 'anonymous@rasang.com'
    },
    events: [{
        type: String,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Booking = mongoose.model('Booking', bookingSchema);
