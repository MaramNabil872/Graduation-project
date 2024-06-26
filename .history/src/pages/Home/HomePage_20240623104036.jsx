import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import HeaderLogo from "../../components/Header-logo/HeaderLogo";
import BottomNav from "../../components/BottomNav/BottomNav";
import CardsProps from "../../components/Cards-carasoul/CardsProps";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import home from "../../../public/assets/images/home.jpg";
import './HomePage.css';

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const data = await getAllRestaurants();
            setRestaurants(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") {
            fetchData(); // Reset to all restaurants if search query is empty
        } else {
            const filteredRestaurants = restaurants.filter((restaurant) =>
                restaurant.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setRestaurants(filteredRestaurants);
        }
    };

    const handleAddToCart = (restaurant) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        const existingItem = storedCart.items.find(item => item.food.id === restaurant.id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.price += restaurant.price;
        } else {
            storedCart.items.push({ food: restaurant, quantity: 1, price: restaurant.price });
        }
        storedCart.totalCount += 1;
        storedCart.totalPrice += restaurant.price;
        localStorage.setItem('cart', JSON.stringify(storedCart));
        console.log(`Added ${restaurant.title} to cart`);
    };

    return (
        <div className="HomePage">
            <HeaderLogo />
            <div className="container1">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button t

            {/* {restaurants === undefined ? (
                <p>Loading...</p>
            ) : restaurants.length === 0 ? (
                <NotFound linkText="No restaurants found" />
            ) : (
                <div className="restaurant-list">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard 
                            key={restaurant.id} 
                            restaurant={restaurant} 
                            onAddToCart={handleAddToCart} 
                        />
                    ))}
                </div>
            )} */}