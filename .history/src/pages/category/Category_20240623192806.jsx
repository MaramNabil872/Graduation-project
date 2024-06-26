import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(https://fakestoreapi.com/products"); 
                const data = response.data;
                console.log('Full response data:', data); // Log the full response data
                
                if (data && Array.isArray(data.categories)) {
                    const categoriesData = data.categories;
                    console.log('Fetched categories data:', categoriesData);
                    setCategories(categoriesData);
                } else {
                    console.error('Expected an array but got:', data.categories);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category.category_id}>
                            <Link to={`/categories/${category.category_id}/stores`}>
                                {category.category_name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No categories available</li>
                )}
            </ul>
            <BottomNav />
        </div>
    );
};

export default CategoriesPage;
