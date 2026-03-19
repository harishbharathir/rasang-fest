import pool from '../db.js';

export async function createTicket({ id, bookingId, eventName, userName, ticketId, seat, date, time, venue, qrCode }) {
    await pool.execute(
        `INSERT INTO tickets (id, bookingId, eventName, userName, ticketId, seat, date, time, venue, qrCode)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            bookingId,
            eventName,
            userName,
            ticketId,
            seat || null,
            date || 'MARCH 15-16, 2026',
            time || '10:00 AM ONWARDS',
            venue || 'MAIN CAMPUS GROUNDS',
            qrCode || null
        ]
    );
    return { id, bookingId, eventName, userName, ticketId, seat, date, time, venue, qrCode };
}

export async function getTicketsByBookingId(bookingId) {
    const [rows] = await pool.execute(`SELECT * FROM tickets WHERE bookingId = ?`, [bookingId]);
    return rows;
}

export async function getTicketsByEmail(email) {
    const [rows] = await pool.execute(
        `SELECT t.* FROM tickets t 
         JOIN bookings b ON t.bookingId = b.id 
         WHERE b.email = ?`,
        [email]
    );
    return rows;
}

