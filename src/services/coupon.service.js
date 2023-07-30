import axios from "axios";
import {API_URL} from "../common/config/config";


export const createCoupon = async (coupon, token) => {
    return await axios.post(`${API_URL}/coupon`, coupon, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
export const editCoupon = async (coupon, id, token) => {
    return await axios.put(`${API_URL}/coupon/${id}`, coupon, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const getCoupon = async (id, token) => {
    return await axios.get(`${API_URL}/coupon/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const getCoupons = async (token) => {
    return await axios.get(`${API_URL}/coupons`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const removeCoupon = async (couponId, token) => {
    return await axios.delete(`${API_URL}/coupon/${couponId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};