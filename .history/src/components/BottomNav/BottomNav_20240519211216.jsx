import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaCog } from 'react-icons/fa';

import './BottomNav.module.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
    return (
      <div className="bottom-navbar">
        <div className="con-effect">
          <div className="effect"></div>
        </div>
        <Link to="/" className="home">
        <FaHome />
        </Link>
        <Link to="/cart">
        <FaShoppingCart />
        </Link>
        <button className="float">
          <Plus />
        </button>
        <Link to="/categories">
          <ShoppingCart />
        </Link>
        <Link to="/user">
          <User />
        </Link>
      </div>
    );
  }
  
  export default BottomNav;