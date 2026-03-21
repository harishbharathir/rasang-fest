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
    try {
        row.events = typeof row.events === 'string' ? JSON.parse(row.events) : row.events;
    } catch (e) {
        console.error("Error parsing events JSON:", e, "Value:", row.events);
        row.events = [row.events];
    }
    return row;
}

export async function getBookingByEmail(email) {
    const [rows] = await pool.execute(`SELECT * FROM bookings WHERE email = ?`, [email]);
    if (rows.length === 0) return null;
    const row = rows[0];
    try {
        row.events = typeof row.events === 'string' ? JSON.parse(row.events) : row.events;
    } catch (e) {
        console.error("Error parsing events JSON:", e, "Value:", row.events);
        row.events = [row.events]; // Fallback if it's just a string in the DB
    }
    return row;
}
