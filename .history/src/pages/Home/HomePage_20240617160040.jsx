import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getAllRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import CardsProps from "../../components/Cards-carasoul/CardsProps";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";

import './HomePage.css';
import './Search.css';
import { useState, useEffect } from 'react';

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    async function fetchData() {
        try {
            const data = await getAllRestaurants();
            console.log(data); // Corrected function name
            setRestaurants(data);
            setFilteredRestaurants(data); // Initialize filtered list with all restaurants
        } catch (error) {
            console.error(error);
        }
    }

    // Function to filter restaurants based on search term
    const filterRestaurants = () => {
        const filtered = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    };

    // Handle input change in the search bar
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        filterRestaurants();
    };

    return (
        <div className="HomePage">
            <Header />

            {/* Search bar */}
            <div className="container">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Restaurant cards */}
            <div className="restaurant-list">
                {filteredRestaurants === undefined ? (
                    <p>Loading...</p>
                ) : filteredRestaurants.length === 0 ? (
                    <NotFound linkText="No restaurants found" />
                ) : (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))
                )}
            </div>

            <BottomNav />
        </div>
    );
}

export default HomePage;