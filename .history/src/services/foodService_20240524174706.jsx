import axios from 'axios';

export const getAll = async () => {
  const { data } = await axios.get('/api/foods');
  return data;
};

export const search = async searchTerm => {
  const { data } = await axios.get('api/foods/search/' + searchTerm);
  return data;
};

export async function getTopRestaurants() {
 
  try {
    const response = await axios.get('api/');
    console.log('All restaurants:', response.data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }
}
export const getTopRestaurantById = async tag => {
  if (tag === 'All') return getAll();
  const { data } = await axios.get('api/foods/tag/' + tag);
  return data;
};

export const getById = async foodId => {
  const { data } = await axios.get('api/foods/' + foodId);
  return data;
};

export async function deleteById(foodId) {
  await axios.delete('api/foods/' + foodId);
}

export async function update(food) {
  await axios.put('api/foods', food);
}

export async function add(food) {
  const { data } = await axios.post('api/foods', food);
  return data;
}
