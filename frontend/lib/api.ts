import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-storage');
        if (token) {
            try {
                const authData = JSON.parse(token);
                if (authData.state?.token) {
                    config.headers.Authorization = `Bearer ${authData.state.token}`;
                }
            } catch (error) {
                console.error('Error parsing auth token:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
