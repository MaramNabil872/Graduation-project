import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaComments, FaShoppingBag, FaUser, FaPlus } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
  // Define a function to handle the click event for the Plus button
  const handleClickPlus = (event) => {
    // Implement your logic here
  };

  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <button className="active">
        <FaHome className='logo' />
      </button>
      <button>
        <FaComments className='logo' />
      </button>
      <button onClick={handleClickPlus} className="float">
        <FaPlus className='logo />
      </button>
      <button>
        <FaShoppingBag className='bx bx-shopping-bag' />
      </button>
      <button>
        <FaUser className='bx bx-user' />
      </button>
    </div>
  );
}

export default BottomNav;
