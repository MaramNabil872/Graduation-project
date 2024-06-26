import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import classes from './cartPage.module.css';
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
        <IonContent>
            <Header />
            <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

            {cart.items.length === 0 ? (
                <NotFound message="Cart Page Is Empty!" imageSrc="./assets/images/shopping-bag.png" />
            ) : (
                <div>
                    <ul className={classes.list}>
                        {cart.items.map(item => (
                            <li key={item.food.id}>
                                <div>
                                    <img src={item.food.imageUrl} alt={item.food.name} />
                                </div>
                                <div>
                                    <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                                </div>

                                <div>
                                    <select
                                        value={item.quantity}
                                        onChange={e => changeQuantity(item, Number(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((num) => (
                                            <option key={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Price price={item.price} />
                                </div>

                                <div>
                                    <button
                                        className={classes.remove_button}
                                        onClick={() => removeFromCart(item.food.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={classes.checkout}>
                        <div>
                            <div className={classes.foods_count}>{cart.totalCount}</div>
                            <div className={classes.total_price}>
                                <Price price={cart.totalPrice} />
                            </div>
                        </div>

                        <Link to="/checkout">Proceed To Checkout</Link>
                    </div>
                </div>
            )}
            <BottomNav />
        </IonContent>
    );
}
