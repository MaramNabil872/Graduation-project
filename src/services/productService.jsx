import axios from 'axios';

export const getAllCategories = async () => {
    const response = await axios.get('http://localhost:5000/categories');
    return response.data;
};

export const getStoresByCategory = async (categoryId) => {
    const response = await axios.get(`http://localhost:5000/categories/${categoryId}/stores`);
    return response.data;
};

export const getProductsByStore = async (storeId) => {
    const response = await axios.get(`http://localhost:5000/stores/${storeId}/products`);
    return response.data;
};
