import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getTopRestaurants } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
      getAllRestaurants()
      .then(data => setRestaurants(data))
      .catch(error => console.error(error));
}, []);
    return (
        <>
            <Header />
            <Search />
            {restaurants.length === 0 ? (
                <NotFound linkText="No restaurants found" />
            ) : (
                <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant.id}>{restaurant.name}</li>
                    ))}
                </ul>
            )}
            <Thumbnails items={restaurants} />

            <BottomNav />
        </>
    );
}
