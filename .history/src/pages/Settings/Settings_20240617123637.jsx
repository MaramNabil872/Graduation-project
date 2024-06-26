import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './Settings.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function Settings() {
  const history = useHistory();
  const { logout } = useAuth() || { logout: () => {} };

  return (
    <div className={classes.settings}>
      <h1>Settings</h1>
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
