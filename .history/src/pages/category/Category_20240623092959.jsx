// src/pages/CategoriesPage/CategoriesPage.js
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/productServiceService';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BottomNav from '../../components/BottomNav/BottomNav';

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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}/stores`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
            <BottomNav />
        </div>
    );
};

export default CategoriesPage;
