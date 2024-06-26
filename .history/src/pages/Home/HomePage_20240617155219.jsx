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

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [originalRestaurants, setOriginalRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const data = await getAllRestaurants();
            console.log(data);
            setRestaurants(data);
            setOriginalRestaurants(data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Handle error by setting loading to false
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (originalRestaurants.length > 0 && searchQuery.trim() !== "") {
            const filteredRestaurants = originalRestaurants.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setRestaurants(filteredRestaurants);
        } else {
            setRestaurants(originalRestaurants); // Reset to original list if search query is empty
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setRestaurants(originalRestaurants); // Reset to original list
    };

    return (
        <div className="HomePage">
            <Header />

            <div className="container">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </form>
            </div>

            <CardsProps/>
            {loading ? (
                <p>Loading...</p>
            ) : restaurants.length === 0 ? (
                <NotFound linkText="No restaurants found" />
            ) : (
                <div className="restaurant-list">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
            <BottomNav />
        </div>
    );
}
