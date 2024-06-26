import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import Swal from 'sweetalert2'; // Import SweetAlert2

function BottomNav() {
  const [open, setOpen] = useState(false);

  const handleClickPlus = () => {
    setOpen(!open); // Toggle the 'open' state
  };

  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <Link className="active" onClick={() => setOpen(false)}>
        <FaHome className="logo" />
      </Link>
      <button onClick={() => setOpen(false)}>
        <FaComments className="logo" />
      </button>
      <button onClick={handleClickPlus} className={`float ${open ? 'open' : ''}`}>
        <FaPlus className="logo" />
      </button>
      <button onClick={() => setOpen(false)}>
        <FaShoppingCart className="logo" />
      </button>
      <button onClick={() => setOpen(false)}>
        <FaUser className="logo" />
      </button>
    </div>
  );
}

export default BottomNav;
