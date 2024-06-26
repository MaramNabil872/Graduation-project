import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import Swal from 'sweetalert2'; // Import SweetAlert2

function BottomNav() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open); // Toggle the 'open' state
  };

  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <button className={`active ${!open ? 'open' : ''}`} onClick={handleClick}>
        <FaHome className="logo" />
      </button>
      <button className={`active ${!open ? 'open' : ''}`} onClick={handleClick}>
        <FaComments className="logo" />
      </button>
      <button className={`float ${open ? 'open' : ''}`} onClick={handleClick}>
        <FaPlus className="logo" />
      </button>
      <button className={`active ${!open ? 'open' : ''}`} onClick={handleClick}>
        <FaShoppingCart className="logo" />
      </button>
      <button className={`active ${!open ? 'open' : ''}`} onClick={handleClick}>
        <FaUser className="logo" />
      </button>
    </div>
  );
}

export default BottomNav;
