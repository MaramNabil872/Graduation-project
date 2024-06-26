import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/productService';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await getAllCategories();
                console.log('Fetched categories data:', categoriesData);
                if (Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                } else {
                    console.error('Expected an array but got:', categoriesData);
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
                        <li key={category.id}>
                            <Link to={`/categories/${category.id}/stores`}>{category.name}</Link>
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
