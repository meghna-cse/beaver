import axios from 'axios';
import {useAuth} from '../components/utils/AuthProvider';

// const API_BASE_URL = 'http://localhost/beaver-backend';
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const apiService = axios.create({
    baseURL:API_BASE_URL,
})

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // remove quotes from the token string

    config.headers.Authorization = `Bearer ${token.replace(/^"(.*)"$/, '$1')}`;
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    return config;
})

export const postRequest = (resource,data) => {
    return apiService.post(`${resource}`,data);
}

export const putRequest = (resource,data) => {
    return apiService.put(`${resource}`,data);
}

export const getRequest = (resource) => {
    return apiService.get(`${resource}`);
};