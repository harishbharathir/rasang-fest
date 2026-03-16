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
            throw new Error('Failed to create booking');
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
