import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categoris.css'; // Import your CSS file for styling

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const addCategory = async () => {
        try {
            await axios.post('http://localhost:5000/categories', { category_name: categoryName });
            setCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Failed to add category:', error);
        }
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
