import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Menu.module.css'; // Ensure you create this CSS file

const Menu = () => {
    // Mock user data
    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150' // Placeholder avatar image
    };

    return (
        <div className={classes.menu}>
            <div className={classes.userProfile}>
                <img src={user.avatar} alt="User Avatar" className={classes.avatar} />
                <span className={classes.userName}>{user.name}</span>
            </div>
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
