import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import './Checkout.css';
import { IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';

const CheckoutPage = () => {
    const [cart, setCart] = useState({ items: [], totalCount: 0, totalPrice: 0 });
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        email: '',
        phone: ''
    });
    const history = useHistory();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        setCart(storedCart);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handlePlaceOrder = async () => {
        const orderDetails = {
            cart,
            shippingInfo,
        };

        try {
            await axios.post('http://localhost:5000/api/orders', orderDetails);
            console.log('Order placed successfully');
            localStorage.removeItem('cart');
            setCart({ items: [], totalCount: 0, totalPrice: 0 });
            // Redirect to order tracking page
            setTimeout(() => {
                history.push('/order-tracking');
            }, 500);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <IonContent>
            <Header />
            <Title title="Checkout Page" margin="1.5rem 0 0 2.5rem" />

            {cart.items.length === 0 ? (
                <div className="empty_cart">
                    <p>Your cart is empty.</p>
                    <Link to="/" className="link">Back to Shopping</Link>
                </div>
            ) : (
                <div className="checkout_form">
                    <div className="order_summary">
                        <h2>Order Summary</h2>
                        <ul className="summary_list">
                            {cart.items.map(item => (
                                <li key={item.product.id} className="summary_item">
                                    <div className="item_details">
                                        {item.product.imageUrl && (
                                            <img src={item.product.imageUrl} alt={item.product.title} className="item_image" />
                                        )}
                                        <div>
                                            <h3>{item.product.title}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <Price price={item.product.price} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="total">
                            <h3>Total:</h3>
                            <Price price={cart.totalPrice} />
                        </div>
                    </div>
                  

                    <div className="actions">
                        <button className="place_order_button" onClick={handlePlaceOrder}>Place Order</button>
                        <Link to="/" className="cancel_button">Cancel</Link>
                    </div>
                </div>
            )}
            <BottomNav />
        </IonContent>
    );
};

export default CheckoutPage;
