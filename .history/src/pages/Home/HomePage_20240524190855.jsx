import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getAllRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import CardsProps from "../../components/Cards-carasoul/CardsProps";
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
        <>
            <Header />
            <Search />
            <CardsProps/>
            {restaurants === undefined ? (
                <p>Loading...</p>
            ) : restaurants.length === 0 ? (
                <NotFound linkText="No restaurants found" />
            ) : (
                <>
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li key={restaurant.id}>{restaurant.title} {restaurant.title}</li>
                          
                        ))}
                    </ul>
                    <Thumbnails items={restaurants} />
                </>
            )}
            <BottomNav />
        </>
    );
}
