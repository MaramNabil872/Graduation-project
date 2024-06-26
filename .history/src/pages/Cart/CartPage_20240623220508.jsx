import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import './cartPage.css';
import NotFound from '../../components/NotFound/NotFound';
import { IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';

export default function CartPage() {
    const [cart, setCart] = useState({ items: [], totalCount: 0, totalPrice: 0 });

    useEffect(() => {
        // Fetch cart data from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        setCart(storedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedItems = cart.items.filter(item => item.food.id !== id);
        updateCart(updatedItems);
    };

    const changeQuantity = (item, quantity) => {
        const updatedItems = cart.items.map(cartItem => 
            cartItem.food.id === item.food.id ? { ...cartItem, quantity } : cartItem
        );
        updateCart(updatedItems);
    };

    const updateCart = (updatedItems) => {
        const totalCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        const updatedCart = {
            items: updatedItems,
            totalCount,
            totalPrice
        };

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    if (!cart || cart.items.length === 0) {
        return (
            <IonContent>
                <Header />
                <NotFound message="Cart Page Is Empty!" imageSrc="./assets/images/shopping-bag.png" />
                <BottomNav />
            </IonContent>
        );
    }

    return (
        <>
            <div className="all">
                <Header />
                <div>
                    <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

                    {cart.items.length === 0 ? (
                        <NotFound message="Cart Page Is Empty!" imageSrc="./assets/images/shopping-bag.png" />
                    ) : (
                        <div>
                            <ul className="list">
                                {cart.items.map(item => (
                                    <li key={item.food.id} className="cart_item">
                                       
                                        <div className="item_details">
                                            <Link to={`/food/${item.food.id}`} className="item_title">{item.food.title}</Link>
                                            <p className="item_description">{item.food.description}</p>
                                            <div className="item_quantity">
                                                <label htmlFor={`quantity-${item.food.id}`}>Quantity: </label>
                                                <select
                                                    id={`quantity-${item.food.id}`}
                                                    value={item.quantity}
                                                    onChange={e => changeQuantity(item, Number(e.target.value))}
                                                >
                                                    {[...Array(10).keys()].map((num) => (
                                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="item_price">
                                                <Price price={item.price} />
                                            </div>
                                            <button
                                                className="remove_button"
                                                onClick={() => removeFromCart(item.food.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="checkout">
                                <div className="summary">
                                    <div className="total_count">Items: {cart.totalCount}</div>
                                    <div className="total_price">
                                        <Price price={cart.totalPrice} />
                                    </div>
                                </div>

                                <Link to="/checkout" className="checkout_button">Proceed To Checkout</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <BottomNav />
        </>
    );
}
