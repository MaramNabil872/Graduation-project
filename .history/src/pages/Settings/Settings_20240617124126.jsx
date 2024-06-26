import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './Settings.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function Settings() {
  const history = useHistory();
  const { user, logout } = useAuth() || { user: null, logout: () => {} };

  return (
    <div className={classes.settings}>
      <div className={classes.header}>
        <img src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png" alt="User Avatar" className={classes.avatar} />
        <h1 className={classes.avatar-title}>Welcome, {user?.name || 'User'}</h1>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/orders">My Orders</Link>
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
  );
}
