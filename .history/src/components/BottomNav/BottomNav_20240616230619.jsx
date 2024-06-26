import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaAlignJustify ,FaCog  } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import { useAuth } from '../../hooks/useAuth';

import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import { Link } from 'react-router-dom';

function BottomNav() {
  const [activeButton, setActiveButton] = useState(''); // State to track active button
  const { user, logout } = useAuth();
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set active button when clicked
  };

  return (
    <div className="bottom-navbar">
      <Link to="/home" className={`button ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
        <FaHome className={`icon ${activeButton === 'home' ? 'active' : ''}`} />
      </Link>
      <Link to="/cart" className={`button ${activeButton === 'cart' ? 'active' : ''}`} onClick={() => handleButtonClick('cart')}>
        <FaShoppingCart className={`icon ${activeButton === 'cart' ? 'active' : ''}`} />
        
      </Link>
     
      <button className="float" onClick={() => handleButtonClick('plus')}>
        <FaPlus className={`logo ${activeButton === 'plus' ? 'active' : ''}`} />
      </button>
      <Link to="/categories" className={`button ${activeButton === 'comments' ? 'active' : ''}`} onClick={() => handleButtonClick('comments')}>
        <FaAlignJustify    className={`icon ${activeButton === 'comments' ? 'active' : ''}`} />
      </Link>
      <Link to="/categories" className={`button ${activeButton === 'comments' ? 'active' : ''}`} onClick={() => handleButtonClick('comments')}>
        <FaAlignJustify    className={`icon ${activeButton === 'comments' ? 'active' : ''}`} />
      </Link>
      {/* {user ? ( <Link to="/profile" className={`button ${activeButton === 'user' ? 'active' : ''}`} onClick={() => handleButtonClick('user')}>
        <FaCog className={`icon ${activeButton === 'user' ? 'active' : ''}`} />
      </Link>): (
             <Link to="/login" className={`button ${activeButton === 'login' ? 'active' : ''}`} onClick={() => handleButtonClick('login')}>
             <FaCog className={`icon ${activeButton === 'user' ? 'active' : ''}`} />
           </Link>
            )} */}
    </div>
  );
}

export default BottomNav;
