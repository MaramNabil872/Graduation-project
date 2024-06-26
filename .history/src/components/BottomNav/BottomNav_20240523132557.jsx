import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import { Link } from 'react-router-dom';

function BottomNav() {
  const [activeButton, setActiveButton] = useState(''); // State to track active button

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set active button when clicked
  };

  return (
    <div className="bottom-navbar">
      <Link to="/home" className={`button ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
        <FaHome className={`icon ${activeButton === 'home' ? 'active' : ''}`} />
      </Link>
      <Link to="/comments" className={`button ${activeButton === 'comments' ? 'active' : ''}`} onClick={() => handleButtonClick('comments')}>
        <FaComments className={`icon ${activeButton === 'comments' ? 'active' : ''}`} />
      </Link>
      <button className="float" onClick={() => handleButtonClick('plus')}>
        <FaPlus className={`logo ${activeButton === 'plus' ? 'active' : ''}`} />
      </button>
   
      <Link to="/user" className={`button ${activeButton === 'user' ? 'active' : ''}`} onClick={() => handleButtonClick('user')}>
        <FaUser className={`icon ${activeButton === 'user' ? 'active' : ''}`} />
      </Link>
    </div>
  );
}

export default BottomNav;
