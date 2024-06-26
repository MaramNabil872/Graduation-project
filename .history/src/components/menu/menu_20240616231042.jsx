import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Menu.module.css'; // Ensure you create this CSS file

const Menu = () => {
    return (
        <div className={classes.menu}>
            <ul>
                <li><Link to="/my-orders">My Orders</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/privacy-policies">Privacy and Policies</Link></li>
            </ul>
        </div>
    );
}

export default Menu;