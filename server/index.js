import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { createBooking } from './models/Booking.js';
import { createTicket, getTicketsByBookingId } from './models/Ticket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper: generate a short random ID
function randomId() {
    return Math.random().toString(36).substr(2, 9);
}

// Bootstrap: create database if not exists, then create tables
async function initDatabase() {
    // Connect without specifying a database to create it if needed
    const tempConn = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
    });

    const dbName = process.env.MYSQL_DATABASE || 'rasang';
    await tempConn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempConn.end();

    // Now import the pool (connected to the newly created DB)
    const { default: pool } = await import('./db.js');

    // Create tables
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS bookings (
            id VARCHAR(36) PRIMARY KEY,
            userName VARCHAR(255) NOT NULL,
            email VARCHAR(255) DEFAULT 'anonymous@rasang.com',
            events JSON NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await pool.execute(`
        CREATE TABLE IF NOT EXISTS tickets (
            id VARCHAR(36) PRIMARY KEY,
            bookingId VARCHAR(36) NOT NULL,
            eventName VARCHAR(255) NOT NULL,
            userName VARCHAR(255) NOT NULL,
            ticketId VARCHAR(50) NOT NULL UNIQUE,
            seat VARCHAR(20),
            date VARCHAR(50) DEFAULT 'MARCH 15-16, 2026',
            time VARCHAR(50) DEFAULT '10:00 AM ONWARDS',
            venue VARCHAR(255) DEFAULT 'MAIN CAMPUS GROUNDS',
            qrCode TEXT,
            FOREIGN KEY (bookingId) REFERENCES bookings(id)
        )
    `);

    console.log('MySQL database and tables ready.');
}

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { userName, email, events } = req.body;

        if (!userName || !events || events.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const bookingId = randomId();
        const savedBooking = await createBooking({
            id: bookingId,
            userName,
            email: email || 'anonymous@rasang.com',
            events
        });

        // Generate tickets for each event
        const savedTickets = [];
        for (const eventName of events) {
            const ticketId = `RSG-26-${Math.floor(1000 + Math.random() * 9000)}`;
            const randomSeat = `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}-${Math.floor(1 + Math.random() * 50)}`;

            const ticket = await createTicket({
                id: randomId(),
                bookingId,
                eventName,
                userName,
                ticketId,
                seat: randomSeat,
                date: 'MARCH 15-16, 2026',
                time: '10:00 AM ONWARDS',
                venue: 'MAIN CAMPUS GROUNDS'
            });
            savedTickets.push(ticket);
        }

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
        const tickets = await getTicketsByBookingId(bookingId);
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server after DB is ready
initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize database:', err.message);
        process.exit(1);
    });
