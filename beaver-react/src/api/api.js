import axios from 'axios';
import {useAuth} from '../components/utils/AuthProvider';

const API_BASE_URL = 'http://localhost/beaver-backend';

export const apiService = axios.create({
    baseURL:API_BASE_URL,
})

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // console.log("token: " + token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export const postRequest = (resource,data) => {
    return apiService.post(`${resource}`,data);
}

export const getRequest = (resource) => {
    return apiService.get(`${resource}`);
};