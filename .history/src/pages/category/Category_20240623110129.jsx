import React, { useState } from 'react';
import './Categori.css'; // Import your CSS file for styling

const Categories = () => {
    const [categories, setCategories] = useState([
        { category_id: 1, category_name: 'Bakery' },
        { category_id: 2, category_name: 'Grocery' }
    ]);
    const [categoryName, setCategoryName] = useState('');

    const addCategory = () => {
        // Dummy function for demonstration, you can optionally implement adding categories dynamically
        console.log('Adding category:', categoryName);
        setCategoryName('');
    };

    return (
        <div className="categories-container">
            <h1 className="categories-title">Categories</h1>
            <div className="add-category-form">
                <input 
                    type="text" 
                    value={categoryName} 
                    onChange={(e) => setCategoryName(e.target.value)} 
                    placeholder="Enter Category Name" 
                    className="category-input" 
                />
                <button onClick={addCategory} className="add-category-btn">Add Category</button>
            </div>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.category_id} className="category-item">{category.category_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
