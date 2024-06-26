import React, { useEffect, useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js library
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import { Link } from 'react-router-dom';

function BottomNav() {
  const [moveY, setMoveY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleTouchStart = (evt) => {
      setMoveY(window.innerHeight - evt.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (moveY > window.innerHeight / 4) {
        anime({
          targets: '.container',
          translateY: `-${window.innerHeight / 2}px`,
          duration: 600,
          easing: 'easeInOutQuad',
        });
        setOpen(true);
      } else {
        anime({
          targets: '.container',
          translateY: '0px',
          duration: 600,
          easing: 'easeInOutQuad',
        });
        setOpen(false);
      }
    };

    const handleTouchMove = (evt) => {
      const newY = (window.innerHeight - moveY) - evt.touches[0].clientY;
      if (!open) {
        anime({
          targets: '.container',
          translateY: `${newY <= window.innerHeight / 2 ? newY > 0 ? -newY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      } else {
        const adjustedMoveY = newY + window.innerHeight / 2;
        anime({
          targets: '.container',
          translateY: `${adjustedMoveY <= window.innerHeight / 2 ? adjustedMoveY > 0 ? -adjustedMoveY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      }
    };

    // Add event listeners
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove);

    // Remove event listeners on component unmount
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [moveY, open]);

  return (
    <div className="bottom-navbar">
      {/* <div className="con-effect">
        <div className="effect"></div>
      </div> */}
      <button className="active">
        <FaHome className="logo" />
      </button>
      <button>
        <FaComments className="logo" />
      </button>
      <button className="float" onClick={() => setOpen(!open)}>
        <FaPlus className="logo" />
      </button>
      <button>
        <FaShoppingCart className="logo" />
      </button>
      <button>
        <FaUser className="logo" />
      </button>
    </div>
  );
}

export default BottomNav;
