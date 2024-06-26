import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';
// import backImage from '../../assets/images/back.png'; // Correctly import the image

export default function Header() {
  const history = useHistory();
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const cart = useCart() || { totalCount: 0 };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo} onClick={() => history.goBack()}>
          <img id="back" src="./assets/images/back.png" alt="Go back" />
        </div>
        <div onClick={logout} className={classes.logout_button} >
        <img id="back" src="" alt="Go back" />
        </div>
        <nav>
          {/* <ul >
            {user ? (
              <li>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <button onClick={logout} className={classes.logout_button}>Logout</button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul> */}
        </nav>
      </div>
    </header>
  );
}
