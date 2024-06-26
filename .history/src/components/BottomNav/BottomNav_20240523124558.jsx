import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
  const [activeButton, setActiveButton] = useState('home'); // State variable to track active button

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update active button state
  };

  return (
    <div className="bottom-navbar">
      <a href='/home' className={activeButton === 'home' ? 'active' : ''} onClick={() => handleButtonClick('home')}>
        <FaHome className="logo" />
      </a>
      <a href='/cart' className={activeButton === 'comments' ? 'active' : ''} onClick={() => handleButtonClick('comments')}>
        <FaComments className="logo" />
      </a>
      <button className={`float ${activeButton === 'plus' ? 'active' : ''}`} onClick={() => handleButtonClick('plus')}>
        <FaPlus className="logo" />
      </button>
      <a href='/categories' className={activeButton === 'cart' ? 'active' : ''} onClick={() => handleButtonClick('cart')}>
        <FaShoppingCart className="logo" />
      </a>
      <button className={activeButton === 'user' ? 'active' : ''} onClick={() => handleButtonClick('user')}>
        <FaUser className="logo" />
      </button>
    </div>
  );
}

export default BottomNav;
