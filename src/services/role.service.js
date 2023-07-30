import axios from "axios";
import {API_URL} from "../common/config/config";



export const getRoles = async (token) => {
    const response = await axios.get(`${API_URL}/roles`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data
};

export const createRole = async (token, roleData) => {
    return await axios.post(`${API_URL}/roles`, roleData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const updateRole = async (token, roleId, roleData) => {
    return await axios.put(`${API_URL}/roles/${roleId}`, roleData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const resetRolesAndPermissions = async (token) => {
    return await axios.get(`${API_URL}/reset`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const deleteRole = async (token, roleId) => {
    return await axios.delete(`${API_URL}/roles/${roleId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
