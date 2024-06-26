import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Chat, Plus, User } from 'boxicons';

import './BottomNav.module.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <Link to="/" className="active">
        <i className='bx bx-home'></i>
      </Link>
      <Link to="/chat">
        <i className='bx bx-chat'></i>
      </Link>
      <button className="float">
        <i className='bx bx-plus'></i>
      </button>
      <Link to="/shopping-bag">
        <i className='bx bx-shopping-bag'></i>
      </Link>
      <Link to="/user">
        <i className='bx bx-user'></i>
      </Link>
    </div>
  );
}

export default BottomNav;