import React from 'react';
import PropTypes from 'prop-types';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant, onAddToCart }) {
    return (
        <div className="restaurant-card">
            {/* <img src={restaurant.image} alt={restaurant.title} className="restaurant-image" /> */}
            <div className="restaurant-info">
                <h3 className="restaurant-title">{restaurant.title}</h3>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-price">Price: ${restaurant.price}</p>
                <button className="add-to-cart-button" onClick={() => onAddToCart(restaurant)}>Add to Cart</button>
            </div>
        </div>
    );
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
};
