import axios from 'axios';
import {API_URL} from "../common/config/config";

export const currentAdmin = async (token, user) => {
    return await axios.post(`${API_URL}/current-admin`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
const forgotPassword = (email) => {
    return axios.put(API_URL + '/forgot-password', email);
};
const changePassword = (userId, data) => {
    return axios.put(`${API_URL}/change-password/${userId}`, data);
};

const resetPassword = (resetInfo) => {
    return axios.put(API_URL + '/reset-password', resetInfo);
};

const verify2FA = (data) => {
    return axios.post(API_URL + '/verify2FA', data).then((response) => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    });
};
const logout = () => {
    localStorage.removeItem('user');
};

const login = (data) => {
    return axios.post(API_URL + '/signin-mfa', data).then((response) => {
        return response.data;
    });
};


const authService = {
    currentAdmin,
    logout,
    verify2FA,
    forgotPassword,
    resetPassword,
    changePassword,
    login
};

export default authService;
