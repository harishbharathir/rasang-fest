const API_BASE_URL = 'http://localhost:5000/api';

export const createBooking = async (bookingData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.message || 'Failed to create booking');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error (createBooking):', error);
        throw error;
    }
};

export const getTickets = async (bookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${bookingId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch tickets');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error (getTickets):', error);
        throw error;
    }
};
export const getTicketsByUser = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/user/${email}`);
        if (!response.ok) throw new Error('Failed to fetch user tickets');
        return await response.json();
    } catch (error) {
        console.error('API Error (getTicketsByUser):', error);
        throw error;
    }
};

export const getFacultyPassByUser = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/faculty-pass/user/${email}`);
        if (!response.ok) return null; // Not found is fine
        return await response.json();
    } catch (error) {
        console.error('API Error (getFacultyPassByUser):', error);
        return null;
    }
};
