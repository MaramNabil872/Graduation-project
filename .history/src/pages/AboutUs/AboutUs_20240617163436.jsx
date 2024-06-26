import React from 'react';
import './AboutUs.css'; // Import CSS file
import Header from '../../components/Header/Header';
import {DishDash} from ''
const AboutUsPage = () => {
    return (
        <div className="about-us-container">
            <Header />
            <div className="content">
                <h1>About DishDash</h1>
                <p>
                    DishDash is dedicated to delivering delicious, high-quality food right to your doorstep. 
                    We prioritize customer satisfaction and strive to provide exceptional service with every order.
                </p>
                <p>
                    Our mission is to make gourmet dining accessible and convenient. Whether you’re craving 
                    a comforting meal or exploring new flavors, DishDash ensures a delightful culinary experience 
                    every time.
                </p>
                <h2>Our Values</h2>
                <ul>
                    <li>Quality ingredients sourced from trusted suppliers</li>
                    <li>Prompt and reliable delivery services</li>
                    <li>Commitment to customer satisfaction</li>
                    <li>Support for local communities and businesses</li>
                </ul>
            </div>
            <div className="image-section">
                <img src="/path/to/image.jpg" alt="DishDash Delivery" />
            </div>
        </div>
    );
}

export default AboutUsPage;
