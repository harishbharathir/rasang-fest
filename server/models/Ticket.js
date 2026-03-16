import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    ticketId: {
        type: String,
        unique: true,
        required: true
    },
    seat: String,
    date: {
        type: String,
        default: 'MARCH 15-16, 2026'
    },
    time: {
        type: String,
        default: '10:00 AM ONWARDS'
    },
    venue: {
        type: String,
        default: 'MAIN CAMPUS GROUNDS'
    },
    qrCode: {
        type: String, // Placeholder for QR data if needed
        default: ''
    }
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
