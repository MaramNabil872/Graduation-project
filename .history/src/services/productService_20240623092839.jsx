// src/services/orderService.js
import axios from 'axios';

export const getAllCategories = async () => {
    const response = await axios.get('/api/categories');
    return response.data;
};

export const getStoresByCategory = async (categoryId) => {
    const response = await axios.get(`/api/categories/${categoryId}/stores`);
    return response.data;
};

export const getProductsByStore = async (storeId) => {
    const response = await axios.get(`/api/stores/${storeId}/products`);
    return response.data;
};