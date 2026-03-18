import pool from '../db.js';

export async function createTicket({ id, bookingId, eventName, userName, ticketId, seat, date, time, venue }) {
    await pool.execute(
        `INSERT INTO tickets (id, bookingId, eventName, userName, ticketId, seat, date, time, venue)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            bookingId,
            eventName,
            userName,
            ticketId,
            seat || null,
            date || 'MARCH 15-16, 2026',
            time || '10:00 AM ONWARDS',
            venue || 'MAIN CAMPUS GROUNDS'
        ]
    );
    return { id, bookingId, eventName, userName, ticketId, seat, date, time, venue };
}

export async function getTicketsByBookingId(bookingId) {
    const [rows] = await pool.execute(`SELECT * FROM tickets WHERE bookingId = ?`, [bookingId]);
    return rows;
}
