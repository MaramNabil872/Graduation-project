import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import {
    getAll,
    getAllByTag,
    getAllTags,
    search,
} from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case "FOODS_LOADED":
            return { ...state, foods: action.payload };
        case "TAGS_LOADED":
            return { ...state, tags: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect(() => {
        console.log("Fetching tags...");
        getAllTags()
            .then((tags) => {
                console.log("Tags loaded:", tags);
                dispatch({ type: "TAGS_LOADED", payload: tags });
            })
            .catch((error) => console.error("Error loading tags:", error));

        loadFoods();
    }, [searchTerm, tag]);
    const loadFoods = async () => {
        try {
            if (tag) {
                console.log("Fetching foods by tag:", tag);
                const foods = await getAllByTag(tag);
                console.log("Foods loaded by tag:", foods);
                dispatch({ type: "FOODS_LOADED", payload: foods });
            } else if (searchTerm) {
                console.log("Searching foods with term:", searchTerm);
                const foods = await search(searchTerm);
                console.log("Foods found by search:", foods);
                dispatch({ type: "FOODS_LOADED", payload: foods });
            } else {
                console.log("Fetching all foods...");
                const foods = await getAll();
                console.log("All foods loaded:", foods);
                dispatch({ type: "FOODS_LOADED", payload: foods });
            }
        } catch (error) {
            console.error("Error loading foods:", error);
        }
    };
    return (
        <>
            <Header />
            <Search />
            <Tags tags={tags} />
            {foods.length === 0 && <NotFound linkText="Reset Search" />}
            <Thumbnails foods={foods} />
            <BottomNav />
        </>
    );
}
