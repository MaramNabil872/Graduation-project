import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getTopRestaurants, getTopRestaurantById } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

const initialState = { restaurants: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case "RESTAURANTS_LOADED":
            return { ...state, restaurants: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { restaurants } = state;

    useEffect(() => {
        console.log("Fetching top restaurants...");
        const getTopRestaurants = async () => {
          try {
            const response = await axios.get('api/top-restaurants');
            return response.data;
          } catch (error) {
            throw error;
          }
        };

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
