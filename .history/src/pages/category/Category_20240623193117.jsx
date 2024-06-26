import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('http://localhost:5000/categories'); // Update URL as per your API endpoint
                const categoriesData = response.data.categories; // Accessing 'categories' array from response

                console.log('Fetched categories data:', categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false whether successful or not
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
