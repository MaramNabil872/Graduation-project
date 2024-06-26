import React, { useEffect, useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus  } from 'react-icons/fa';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js library
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling
import { FaComments } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2

function BottomNav() {
  const [moveY, setMoveY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const buttons = document.querySelectorAll('.bottom-navbar button:not(.float)');
    const effect = document.querySelector('.effect');
    const container = document.querySelector('.container');

    const handleTouchStart = (evt) => {
      const area = window.innerHeight - evt.touches[0].clientY;
      setMoveY(area);
    };

    const handleTouchEnd = () => {
      setMoveY(0);
      if (moveY > window.innerHeight / 4) {
        anime({
          targets: '.container',
          translateY: `-${window.innerHeight / 2}px`,
          duration: 600,
        });
        setOpen(true);
      } else {
        anime({
          targets: '.container',
          translateY: `0px`,
          duration: 600,
          easing: 'easeOutExpo',
        });
        setOpen(false);
      }
    };

    const handleTouchMove = (evt) => {
      const newY = (window.innerHeight - moveY) - evt.touches[0].clientY;
      setMoveY(newY);
      if (!open) {
        anime({
          targets: '.container',
          translateY: `${newY <= window.innerHeight / 2 ? newY > 0 ? -newY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      } else if (open) {
        const adjustedMoveY = newY + window.innerHeight / 2;
        anime({
          targets: '.container',
          translateY: `${adjustedMoveY <= window.innerHeight / 2 ? adjustedMoveY > 0 ? -adjustedMoveY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      }
    };

    buttons.forEach((item) => {
      item.addEventListener('click', (evt) => {
        const x = evt.target.offsetLeft;
        buttons.forEach((btn) => { btn.classList.remove('active') });
        evt.target.classList.add('active');
        anime({
          targets: '.effect',
          left: `${x}px`,
          duration: 600,
        });
      });
    });

    // Cleanup function
    return () => {
      buttons.forEach((item) => {
        item.removeEventListener('click', () => {});
      });
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

 
  const handleClickPlus = () => {
    Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      });
alert
    };

  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <button className="active">
        <FaHome className="bx bx-home" />
      </button>
      <button>
        <FaComments className="bx bx-chat" />
      </button>
      <button onClick={handleClickPlus} className="float">
        <FaPlus className="bx bx-plus"  />
      </button>
      <button>
        <FaShoppingCart className="bx bx-shopping-bag" />
      </button>
      <button>
        <FaUser className="bx bx-user" />
      </button>

    </div>
  );
}

export default BottomNav;
