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
const resetPassword = (resetInfo) => {
    return axios.put(API_URL + '/reset-password', resetInfo);
};

const logout = () => {
    localStorage.removeItem('user');
};

const login = (data) => {
    return axios.post(API_URL + '/signin', data).then((response) => {
        if (response.data.user.token) {
            console.log('USER', response.data);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    });
};


const authService = {
    currentAdmin,
    logout,
    forgotPassword,
    resetPassword,
    login
};

export default authService;
