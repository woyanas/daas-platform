/// <reference types="vite/client" />
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
    create: (data: { email: string; password: string; fullName: string; role?: string }) => api.post('/users', data),
    updateMe: (data: { fullName?: string }) => api.patch('/users/me', data),
    changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => api.patch('/users/me/password', data),
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
    getById: (id: string) => api.get(`/services/${id}`),
    getMyConfig: () => api.get('/services/my-config'),
    updateConfig: (id: string, data: any) => api.patch(`/services/${id}/config`, data),
    toggle: (id: string, isEnabled: boolean) => api.patch(`/services/${id}`, { isEnabled }),
};

export const connectorsApi = {
    getAll: () => api.get('/services/connectors'),
    getById: (id: string) => api.get(`/services/connectors/${id}`),
    create: (data: any) => api.post('/services/connectors', data),
    update: (id: string, data: any) => api.patch(`/services/connectors/${id}`, data),
    remove: (id: string) => api.delete(`/services/connectors/${id}`),
};

export const widgetPacksApi = {
    getAll: () => api.get('/services/widget-packs'),
    getById: (id: string) => api.get(`/services/widget-packs/${id}`),
    create: (data: any) => api.post('/services/widget-packs', data),
    update: (id: string, data: any) => api.patch(`/services/widget-packs/${id}`, data),
    remove: (id: string) => api.delete(`/services/widget-packs/${id}`),
};

export const alertsApi = {
    getAll: () => api.get('/services/alerts'),
    getById: (id: string) => api.get(`/services/alerts/${id}`),
    create: (data: any) => api.post('/services/alerts', data),
    update: (id: string, data: any) => api.patch(`/services/alerts/${id}`, data),
    remove: (id: string) => api.delete(`/services/alerts/${id}`),
};

export const reportsApi = {
    getAll: () => api.get('/services/reports'),
    getById: (id: string) => api.get(`/services/reports/${id}`),
    create: (data: any) => api.post('/services/reports', data),
    update: (id: string, data: any) => api.patch(`/services/reports/${id}`, data),
    download: (id: string) => api.get(`/services/reports/${id}/download`),
};

export const integrationsApi = {
    getAll: () => api.get('/services/integrations'),
    getById: (id: string) => api.get(`/services/integrations/${id}`),
    create: (data: any) => api.post('/services/integrations', data),
    update: (id: string, data: any) => api.patch(`/services/integrations/${id}`, data),
    test: (id: string) => api.post(`/services/integrations/${id}/test`),
};

export const featureFlagsApi = {
    getAll: () => api.get('/services/feature-flags'),
    update: (id: string, data: any) => api.patch(`/services/feature-flags/${id}`, data),
};

export const subscriptionsApi = {
    getPlans: () => api.get('/subscriptions/plans'),
    getCurrent: () => api.get('/subscriptions/current'),
    getUsage: () => api.get('/subscriptions/usage'),
    subscribe: (planSlug: string) => api.post('/subscriptions/subscribe', { planSlug }),
};
