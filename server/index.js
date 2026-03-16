import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import { Booking } from './models/Booking.js';
// import { Ticket } from './models/Ticket.js';

let mockBookings = [];
let mockTickets = [];

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rasrang';

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Optional for this demo to work without DB)
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection skipped/failed, using in-memory mock.'));

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { userName, email, events } = req.body;

        if (!userName || !events || events.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Mock saving booking
        const savedBooking = {
            _id: Math.random().toString(36).substr(2, 9),
            userName,
            email: email || 'anonymous@rasang.com',
            events,
            createdAt: new Date()
        };
        mockBookings.push(savedBooking);

        // Generate tickets for each event
        const savedTickets = events.map((eventName) => {
            const ticketId = `RSG-26-${Math.floor(1000 + Math.random() * 9000)}`;
            const randomSeat = `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}-${Math.floor(1 + Math.random() * 50)}`;

            const newTicket = {
                _id: Math.random().toString(36).substr(2, 9),
                bookingId: savedBooking._id,
                eventName,
                userName,
                ticketId,
                seat: randomSeat,
                date: "MARCH 15-16, 2026",
                time: "10:00 AM ONWARDS",
                venue: "MAIN CAMPUS GROUNDS"
            };
            mockTickets.push(newTicket);
            return newTicket;
        });

        res.status(201).json({
            message: 'Booking successful',
            booking: savedBooking,
            tickets: savedTickets
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get tickets for a booking
app.get('/api/tickets/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const tickets = mockTickets.filter(t => t.bookingId === bookingId);
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
