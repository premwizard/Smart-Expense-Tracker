import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('aet_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;
