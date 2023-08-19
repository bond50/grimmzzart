import axios from 'axios';
import {API_URL} from "../common/config/config";

export const listOrders = async (token, query) => {
    const response = await axios.get(`${API_URL}/orders?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    localStorage.setItem('orders', JSON.stringify(response.data));
    return response;
};



export const getOrder = async (token, orderId) => {
    return await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getTotalAmount = async (token) => {
    return await axios.get(`${API_URL}/total-amount`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateOrderStatus = async (token, orderId, status) => {
    return await axios.put(`${API_URL}/orders/${orderId}/status`, {status}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteOrder = async (token, orderId) => {
    return await axios.delete(`${API_URL}/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const countTotalOrders = async (token) => {
    return await axios.get(`${API_URL}/orders/count`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const orderService = {
    listOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
    getTotalAmount,
    countTotalOrders
};

export default orderService;
