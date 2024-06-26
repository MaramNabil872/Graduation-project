import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getCartFromLocalStorage());

  useEffect(() => {
    const totalPrice = sum(cart.items.map(item => item.price));
    const totalCount = sum(cart.items.map(item => item.quantity));

    const updatedCart = {
      items: cart.items,
      totalPrice,
      totalCount,
    };

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

    setCart(updatedCart);
  }, [cart.items]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = items => items.reduce((prevValue, curValue) => prevValue + curValue, 0);

  const removeFromCart = foodId => {
    const filteredCartItems = cart.items.filter(item => item.food.id !== foodId);
    setCart({ ...cart, items: filteredCartItems });
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };
    setCart({
      ...cart,
      items: cart.items.map(item => (item.food.id === food.id ? changedCartItem : item)),
    });
  };

  const addToCart = food => {
    const cartItem = cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCart({
        ...cart,
        items: [...cart.items, { food, quantity: 1, price: food.price }],
      });
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCart(EMPTY_CART);
  };

  const value = {
    cart,
    removeFromCart,
    changeQuantity,
    addToCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
