import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getAllRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import CardsProps from "../../components/Cards-carasoul/CardsProps";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";

import './HomePage.css'
export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    async function fetchData() {
        try {
            const data = await getAllRestaurants();
            console.log(data); // Corrected function name
            setRestaurants(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="HomePage">
            <Header />
    
            <CardsProps/>
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
            <BottomNav />
        </div>
    );
}
