import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUser, FaPlus, FaComments } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './BottomNav.css'; // Assuming you have a CSS file named 'BottomNav.css' for styling

function BottomNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickPlus = () => {
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    });
  };

  return (
    <div className="bottom-navbar">
      <div className="con-effect">
        <div className="effect"></div>
      </div>
      <button className="active"><FaHome className="bx bx-home" /></button>
      <button><FaComments className="bx bx-chat" /></button>
      <button onClick={handleClickPlus} className="float"><FaPlus className="bx bx-plus" /></button>
      <button><FaShoppingCart className="bx bx-shopping-bag" /></button>
      <button><FaUser className="bx bx-user" /></button>
    </div>
  );
}

export default BottomNav;
