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

export const checkUserRegistration = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${email}`);
        if (!response.ok) return { registered: false };
        return await response.json();
    } catch (error) {
        console.error('API Error (checkUserRegistration):', error);
        return { registered: false };
    }
};

export const registerStudent = async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to register student');
    return await response.json();
};

export const registerFaculty = async (facultyData) => {
    const response = await fetch(`${API_BASE_URL}/faculty-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyData),
    });
    if (!response.ok) throw new Error('Failed to register faculty');
    return await response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || 'Invalid credentials');
    }
    return await response.json();
};

