import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/orderService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
// You might need to create a loading spinner component

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // if (loading) {
  //   return <LoadingSpinner/>;
  // }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <Bott
    </div>
  );
};

export default CategoriesPage;
