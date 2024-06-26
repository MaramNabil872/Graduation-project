import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Category.css'; // Import your CSS file for styling

const CategoriesPage = () => {
    // Define static categories
    const categories = [
        { id: 1, name: 'Bakery' },
        { id: 2, name: 'Grocery' }
    ];

    return (
        <div className="container">
         
            <h1 className="categories-title">Categories</h1>
            <ul className="categories-list">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li>
                            <Link to={`/categories/${category.name.toLowerCase()}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No categories available</li>
                )}
            </ul>
            <BottomNav className="bottom-nav" />
        </div>
    );
};

export default CategoriesPage;
