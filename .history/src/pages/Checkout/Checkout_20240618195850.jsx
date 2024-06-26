import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import classes from './checkoutPage.module.css';
import { IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Checkout.css\'
export default function CheckoutPage() {
    const [cart, setCart] = useState({ items: [], totalCount: 0, totalPrice: 0 });
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        // Fetch cart data from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        setCart(storedCart);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handlePlaceOrder = () => {
        // Implement your order placement logic here
        console.log('Placing order...', shippingInfo);
        // Reset cart and navigate to confirmation page
        localStorage.removeItem('cart');
        setCart({ items: [], totalCount: 0, totalPrice: 0 });
        // Redirect or navigate to order confirmation page
        // Example: history.push('/order-confirmation');
    };

    return (
        <IonContent>
            <Header />
            <Title title="Checkout Page" margin="1.5rem 0 0 2.5rem" />

            {cart.items.length === 0 ? (
                <div className={classes.empty_cart}>
                    <p>Your cart is empty.</p>
                    <Link to="/" className={classes.link}>Back to Shopping</Link>
                </div>
            ) : (
                <div className={classes.checkout_form}>
                    <div className={classes.order_summary}>
                        <h2>Order Summary</h2>
                        <ul className={classes.summary_list}>
                            {cart.items.map(item => (
                                <li key={item.food.id} className={classes.summary_item}>
                                    <div className={classes.item_details}>
                                        <img src={item.food.imageUrl} alt={item.food.title} className={classes.item_image} />
                                        <div>
                                            <h3>{item.food.title}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <Price price={item.price} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={classes.total}>
                            <h3>Total:</h3>
                            <Price price={cart.totalPrice} />
                        </div>
                    </div>

                    <div className={classes.shipping_info}>
                        <h2>Shipping Information</h2>
                        <form className={classes.form}>
                            <div className={classes.form_group}>
                                <label htmlFor="fullName">Full Name:</label>
                                <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} required />
                            </div>
                            <div className={classes.form_group}>
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required />
                            </div>
                            <div className={classes.form_group}>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                            </div>
                            <div className={classes.form_group}>
                                <label htmlFor="postalCode">Postal Code:</label>
                                <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required />
                            </div>
                            <div className={classes.form_group}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={shippingInfo.email} onChange={handleInputChange} required />
                            </div>
                            <div className={classes.form_group}>
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={shippingInfo.phone} onChange={handleInputChange} required />
                            </div>
                        </form>
                    </div>

                    <div className={classes.actions}>
                        <button className={classes.place_order_button} onClick={handlePlaceOrder}>Place Order</button>
                        <Link to="/" className={classes.cancel_button}>Cancel</Link>
                    </div>
                </div>
            )}
            <BottomNav />
        </IonContent>
    );
}
