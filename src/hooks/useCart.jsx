import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage().items);
  const [totalPrice, setTotalPrice] = useState(() => getCartFromLocalStorage().totalPrice);
  const [totalCount, setTotalCount] = useState(() => getCartFromLocalStorage().totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );

    // Update context value whenever cartItems, totalPrice, or totalCount change
    updateCartContext({ items: cartItems, totalPrice, totalCount });
  }, [cartItems, totalPrice, totalCount]);

  function updateCartContext(cartData) {
    setCart(cartData);
  }

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = items => items.reduce((prevValue, curValue) => prevValue + curValue, 0);

  const removeFromCart = foodId => {
    const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };
    setCartItems(cartItems.map(item => (item.food.id === food.id ? changedCartItem : item)));
  };

  const addToCart = food => {
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCartItems([]);
    setTotalPrice(0);
    setTotalCount(0);
  };

  const value = {
    cart: { items: cartItems, totalPrice, totalCount },
    removeFromCart,
    changeQuantity,
    addToCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
