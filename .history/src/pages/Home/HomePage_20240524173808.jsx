import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getTopRestaurants, getTopRestaurantById } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        console.log("Fetching top restaurants...");

        getTopRestaurants()
            .then((restaurants) => {
                console.log("Top restaurants loaded:", restaurants);
                setRestaurants(restaurants);
            })
            .catch((error) => console.error("Error loading top restaurants:", error));
    }, []);

    return (
        <>
            <Header />
            <Search />
            {restaurants.length === 0 && <NotFound linkText="No restaurants found" />}
            <Thumbnails items={restaurants} />
            <BottomNav />
        </>
    );
}