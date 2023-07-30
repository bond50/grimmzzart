import axios from "axios";
import {API_URL} from "../common/config/config";

export const getBrands = async () => {
  try {
    return await axios.get(`${API_URL}/brands`);
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const getBrand = async (slug) => {
  return await axios.get(`${API_URL}/brand/${slug}`);
};

export const removeBrand = async (slug, token) => {
  return await axios.delete(`${API_URL}/brand/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const updateBrand = async (slug, brand, token) => {
  return await axios.put(`${API_URL}/brand/${slug}`, brand, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const createBrand = async (brand, token) => {
  return await axios.post(`${API_URL}/brand/`, brand, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};
