import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getAllRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import CardsProps from "../../components/Cards-carasoul/CardsProps";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import FoodCard from "../../components/FoodCard/FoodCard";
import { StoreContext } from "../../Context/StoreContext";

import './HomePage.css';
import './Search.css';

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { food_list } = useContext(StoreContext);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const data = await getAllRestaurants();
            console.log(data);
            setRestaurants(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (restaurants && restaurants.length > 0) {
            const filteredRestaurants = restaurants.filter((restaurant) =>
                restaurant && restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setRestaurants(filteredRestaurants);
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            fetchData();
        }
    }, [searchQuery]);

    return (
        <div className="HomePage">
            <Header />

            <div className="container1">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <CardsProps />
            {restaurants === undefined ? (
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

            <div className="food-list">
                {food_list.map(foodItem => (
                    <FoodCard key={foodItem._id} foodItem={foodItem} />
                ))}
            </div>

            <BottomNav />
        </div>
    );
}
