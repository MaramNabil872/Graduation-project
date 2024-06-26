import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaCog, FaPlus } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
  return (
    <div className="bottom-navbar">
      <Link to="/" className="home">
        <FaHome />
      </Link>
      <Link to="/cart">
        <FaShoppingCart />
      </Link>
      <button className="float">
        <FaPlus />
      </button>
      <Link to="/categories">
        <FaUser />
      </Link>
      <Link to="/user">
        <FaCog />
      </Link>
      <div className="con-effect">
        <div className="effect"></div>
      </div>
    </div>
  );
}

export default BottomNav;
