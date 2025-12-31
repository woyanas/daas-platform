import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'admin' | 'editor' | 'viewer';
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { accessToken, refreshToken, user } = response.data;

                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (email, password, fullName) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/register', { email, password, fullName });
                    const { accessToken, refreshToken, user } = response.data;

                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Registration failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await api.post('/auth/logout');
                } catch {
                    // Ignore errors
                }

                delete api.defaults.headers.common['Authorization'];

                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Initialize auth header on app load
const state = useAuthStore.getState();
if (state.accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
}
