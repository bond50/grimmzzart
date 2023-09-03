import axios from "axios";
import {API_URL} from "../common/config/config";

export const createBanner = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/banner`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listBanners = async () => {
    try {
        const response = await axios.get(`${API_URL}/banners`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const readBanner = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/banner/${slug}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateBanner = async (slug, formData, token) => {
    try {
        const response = await axios.put(`${API_URL}/banner/${slug}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteBanner = async (slug, token) => {
    try {
        const response = await axios.delete(`${API_URL}/banner/${slug}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
