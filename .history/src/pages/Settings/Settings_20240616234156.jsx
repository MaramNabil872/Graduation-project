import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicies from './pages/PrivacyPolicies';
import classes from './Settings.module.css'; // Ensure you create this CSS file

const MainPage = () => {
    return (
        <Router>
            <div className={classes.container}>
                <Menu />
                <div className={classes.content}>
                    <Switch>
                        <Route path="/my-orders" component={MyOrders} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/contact-us" component={ContactUs} />
                        <Route path="/privacy-policies" component={PrivacyPolicies} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default MainPage;
