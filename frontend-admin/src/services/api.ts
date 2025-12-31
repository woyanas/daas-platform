import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle token refresh or logout
            const { logout } = await import('../store/authStore').then(m => m.useAuthStore.getState());
            logout();
        }
        return Promise.reject(error);
    }
);

export default api;

// API helpers
export const usersApi = {
    getAll: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
    getStats: () => api.get('/users/stats'),
    getMe: () => api.get('/users/me'),
    updateMe: (data: { fullName?: string }) => api.patch('/users/me', data),
    updateRole: (id: string, role: string) => api.patch(`/users/${id}/role`, { role }),
    delete: (id: string) => api.delete(`/users/${id}`),
};

export const dashboardsApi = {
    getAll: () => api.get('/dashboards'),
    getAnalytics: () => api.get('/dashboards/analytics'),
    create: (data: any) => api.post('/dashboards', data),
    update: (id: string, data: any) => api.patch(`/dashboards/${id}`, data),
    delete: (id: string) => api.delete(`/dashboards/${id}`),
};

export const servicesApi = {
    getAll: () => api.get('/services'),
    getMyConfig: () => api.get('/services/my-config'),
    updateConfig: (id: string, data: any) => api.patch(`/services/${id}/config`, data),
};

export const subscriptionsApi = {
    getPlans: () => api.get('/subscriptions/plans'),
    getCurrent: () => api.get('/subscriptions/current'),
    getUsage: () => api.get('/subscriptions/usage'),
    subscribe: (planSlug: string) => api.post('/subscriptions/subscribe', { planSlug }),
};
