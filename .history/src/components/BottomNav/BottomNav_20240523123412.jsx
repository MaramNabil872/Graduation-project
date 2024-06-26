import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import Swal from 'sweetalert2'; // Import SweetAlert2

function BottomNav() {
  const [open, setOpen] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

  const handleClickPlus = (evt) => {
    const rect = evt.target.getBoundingClientRect(); // Get icon position relative to the viewport
    const bodyRect = document.body.getBoundingClientRect(); // Get body position relative to the viewport
    const iconPositionX = rect.left - bodyRect.left; // Calculate icon's horizontal position
    const iconPositionY = rect.top - bodyRect.top; // Calculate icon's vertical position
    setIconPosition({ x: iconPositionX, y: iconPositionY });
    setOpen(!open); // Toggle the 'open' state
  };

  return (
    <div className="bottom-navbar">
      <div className="con-effect" style={{ left: iconPosition.x, top: iconPosition.y }}>
        <div className="effect"></div>
      </div>
      <Link className="active" onClick={() => setOpen(false)}>
        <FaHome className="logo" />
      </Link>
      <Link onClick={() => setOpen(false)}>
        <FaComments className="logo" />
      </Link>
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
