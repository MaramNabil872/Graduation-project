import axios from 'axios';

export const createOrder = async order => {
  try {
    const { data } = axios.post('/api/orders/create', order);
    return data;
  } catch (error) {}
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get('/api/categories');
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Throw the error so it can be handled by the component
  }
};
export const trackOrderById = async orderId => {
  const { data } = await axios.get('/api/orders/track/' + orderId);
  return data;
};

export const getAllStatus = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/order-statuses`);
      return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
      console.error('Failed to fetch statuses:', error);
      return [];
  }
};

export const getAllOrders = async (status) => {
  try {
      const response = await axios.get(`http://localhost:5000/api/orders`, {
          params: { status }
      });
      return response.data;
  } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
  }
};