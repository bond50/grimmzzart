// src/services/user.service.js
import axios from 'axios';
import {API_URL} from "../common/config/config";


export const getAllUsers = (token) => {
    return axios
        .get(API_URL + "/user-management/users", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            // Return the error message from the server
            return {error: error.response.data.error};
        });
};


export const deleteUser = async (userId, token) => {
    const response = await axios.delete(API_URL + `/user-management/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};


export const getUser = (userId, token) => {
    return axios
        .get(API_URL + `/user-management/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return Promise.resolve(response.data); // return a promise that resolves to the response data
        })
        .catch((error) => {
            // Return the error message from the server
            return {error: error.response.data.error};
        });
};
export const getUserVerificationInfo = (userId, token) => {
    return axios
        .get(API_URL + `/user-verification/${userId}`)
        .then((response) => {
            return Promise.resolve(response.data); // return a promise that resolves to the response data
        })
        .catch((error) => {
            // Return the error message from the server
            return Promise.reject({error: error.response.data.error});
        });
};


export const updateUser = async (userId, updatedUserData, token) => {
    const response = await axios.put(API_URL + `/user-management/${userId}`, updatedUserData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });


    return response.data;
};


export const createUser = async (userData, token) => {

    console.log(userData)
    console.log(token)
    const response = await axios.post(API_URL + '/user-management/create-user', userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
};
