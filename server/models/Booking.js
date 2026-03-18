import pool from '../db.js';

export async function createBooking({ id, userName, email, events }) {
    const eventsJson = JSON.stringify(events);
    await pool.execute(
        `INSERT INTO bookings (id, userName, email, events) VALUES (?, ?, ?, ?)`,
        [id, userName, email || 'anonymous@rasang.com', eventsJson]
    );
    return { id, userName, email, events, createdAt: new Date() };
}

export async function getBookingById(id) {
    const [rows] = await pool.execute(`SELECT * FROM bookings WHERE id = ?`, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    row.events = JSON.parse(row.events);
    return row;
}
