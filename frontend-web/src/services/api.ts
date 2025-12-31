import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Contact API
export const contactApi = {
    submit: (data: {
        name: string;
        email: string;
        company?: string;
        subject?: string;
        message: string;
    }) => api.post('/contact', data),
};

// Plans API
export const plansApi = {
    getAll: () => api.get('/subscriptions/plans'),
};

export default api;
