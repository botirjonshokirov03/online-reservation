import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AdminState {
    admin: AdminUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set) => ({
            admin: null,
            token: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { user, token } = response.data;

                    if (user.role !== 'admin') {
                        throw new Error('Access denied. Admin only.');
                    }

                    localStorage.setItem('token', token);
                    set({ admin: user, token, isAuthenticated: true });
                } catch (error: any) {
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({ admin: null, token: null, isAuthenticated: false });
            },

            checkAuth: () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    set({ admin: null, token: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'admin-storage',
        }
    )
);
