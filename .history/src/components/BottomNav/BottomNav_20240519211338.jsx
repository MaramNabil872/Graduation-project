import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaCog ,FaPlus  } from 'react-icons/fa';

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
        <FaUser />
        </Link>
        <Link to="/user">
        <FaCog />
        </Link>
      </div>
    );
  }
  
  export default BottomNav;