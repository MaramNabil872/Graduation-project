import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import NotFound from '../../components/NotFound/NotFound';
import HeaderLogo from '../../components/Header-logo/HeaderLogo';
import BottomNav from '../../components/BottomNav/BottomNav';
import './cartPage.css';

const CartPage = () => {
    const [cart, setCart] = useState({ items: [], totalCount: 0, totalPrice: 0 });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        setCart(storedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedItems = cart.items.filter(item => item.product.id !== id);
        updateCart(updatedItems);
    };

    const changeQuantity = (item, quantity) => {
        const updatedItems = cart.items.map(cartItem =>
            cartItem.product.product_id === item.product.product_id ? { ...cartItem, quantity } : cartItem
        );
        updateCart(updatedItems);
    };

    const updateCart = (updatedItems) => {
        const totalCount = updatedItems.reduce((acc, item) => acc + item.product.quantity, 0);
        const totalPrice = updatedItems.reduce((acc, item) => acc + (item.product.list_price * item.product.quantity), 0);

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
            <div className="CartPage">
                <HeaderLogo />
                <NotFound message="Cart Page Is Empty!" imageSrc="./assets/images/shopping-bag.png" />
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="CartPage">
            <HeaderLogo />
            <div className="container">
                <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

                <ul className="cart-list">
                    {cart.items.map(item => (
                        <li key={item.product.product_id} className="cart-item">
                            <div className="item-details">
                                <Link to={`/products/${item.product.id}`} className="item-title">{item.product.product_name}</Link>
                              
                                <div className="item-quantity">
                                    <label htmlFor={`quantity-${item.product.quantity}`}>Quantity: </label>
                                    <select
                                        id={`quantity-${item.product.product_id}`}
                                        value={item.quantity}
                                        onChange={e => changeQuantity(item, Number(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="item-price">
                                    <Price price={item.product.list_price} />
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.product.product_id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="summary">
                    <div className="total-count">Items: {cart.totalCount}</div>
                    <div className="total-price">
                        <Price price={cart.totalPrice} />
                    </div>
                </div>

                <Link to="/checkout" className="checkout-button">Proceed To Checkout</Link>
            </div>

            <BottomNav />
        </div>
    );
};

export default CartPage;
