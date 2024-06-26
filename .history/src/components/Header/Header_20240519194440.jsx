import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const cart = useCart() || { totalCount: 0 };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
      <img id="headerImg" className="w-full" src="./assets/images/header.png" />
        <nav>
          <ul className={classes.nav_list}>
            {user ? (
              <li className={classes.menu_container}>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

