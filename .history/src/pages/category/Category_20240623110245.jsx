import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';

const CategoriesPage = () => {
    // Define static categories
    const categories = [
        { id: 1, name: 'Bakery' },
        { id: 2, name: 'Grocery' }
    ];

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
