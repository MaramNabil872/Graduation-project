import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Category.css'; // Import your CSS file for styling

const CategoriesPage = () => {
    return (
        <div className="container">
            <h1 className="categories-title">Categories</h1>
            <ul className="categories-list">
                <li>
                    <Link to="/bakery">Bakery</Link>
                </li>
                <li>
                    <Link to="/grocery">Grocery</Link>
                </li>
            </ul>
            <BottomNav className="bottom-nav" />
        </div>
    );
};

export default CategoriesPage;
