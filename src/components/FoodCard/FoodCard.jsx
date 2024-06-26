import React, { useContext } from "react";
import { StoreContext } from '../../Context/StoreContext';
import './FoodCard.css';

const FoodCard = ({ foodItem }) => {
    const { addToCart } = useContext(StoreContext);

    return (
        <div className="food-card">
            <img src={foodItem.image} alt={foodItem.name} />
            <div className="food-card-details">
                <h3>{foodItem.name}</h3>
                <p>{foodItem.description}</p>
                <p>${foodItem.price}</p>
                <button onClick={() => addToCart(foodItem)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default FoodCard;
