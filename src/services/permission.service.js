import axios from "axios";
import {API_URL} from "../common/config/config";


export const getPermissions = async (token) => {
    return await axios.get(`${API_URL}/permissions`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const getPermissionsWithPagination = async (token) => {
    return await axios.get(`${API_URL}/permissions-pagination`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};




export const createPermission = async (token, permissionData) => {
    return await axios.post(`${API_URL}/permissions`, permissionData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const updatePermission = async (token, permissionId, permissionData) => {
    return await axios.put(`${API_URL}/permissions/${permissionId}`, permissionData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const deletePermission = async (token, permissionId) => {
    return await axios.delete(`${API_URL}/permissions/${permissionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const assignRoleToUser = async (token, userId, roleId) => {
    return await axios.post(`${API_URL}/assign-role`, {userId, roleId}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const removeRoleFromUser = async (token, userId, roleId) => {
    return await axios.post(`${API_URL}/remove-role`, {userId, roleId}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
