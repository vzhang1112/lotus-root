const API_URL = 'http://localhost:3000'; // Update with your backend URL

export const createProfile = async (profileData) => {
    const response = await fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    });
    return response.json();
};

export const updateProfile = async (id, profileData) => {
    const response = await fetch(`${API_URL}/profiles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    });
    return response.json();
};

export const getProfile = async (id) => {
    const response = await fetch(`${API_URL}/profiles/${id}`);
    return response.json();
};