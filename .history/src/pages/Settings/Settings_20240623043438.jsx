import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './Settings.module.css';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';

export default function Settings() {
  const history = useHistory();
  const [user, setUser] = useState();

  // Simulate logout function
  const logout = () => {
    // Implement logout logic if needed
    console.log("Logging out...");
    setUser(null);
    history.push('/'); // Redirect to home or login page after logout
  };

  return (
    <div className={classes.all}>
      <Header/>
      <div className={classes.settings}>
        <div className={classes.header}>
          <img src="https://static.vecteezy.com/system/resources/previews/014/194/232/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg" alt="User Avatar" className={classes.avatar} />
          <h1 className={classes.avatarTitle}>Welcome, {user?.name || 'user.admin'}</h1>
        </div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/update-profile">Update Your Profile</Link>
            </li>
            <li>
              <Link to="/change-password">Change Password</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
            {user && (
              <li>
                <Link to="/products">Products</Link>
              </li>
            )}
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/rate-us">Rate Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy and Policy</Link>
            </li>
            <li>
              <button onClick={logout} className={classes.logoutButton}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
      <BottomNav/>
    </div>
  );
}
