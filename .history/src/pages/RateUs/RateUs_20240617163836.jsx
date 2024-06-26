import React from 'react';
import './RateUsPage.css'; // Import CSS file
import Header from '../../components/Header/Header';

const RateUsPage = () => {
    return (
        <div className="rate-us-container">
            <Header />
            <div className="content">
                <h1>Rate Us</h1>
                <p>We value your feedback. Please take a moment to rate your experience with DishDash.</p>
                <div className="rating-options">
                    <input type="radio" id="rating5" name="rating" value="5" />
                    <label htmlFor="rating5">☆☆☆☆☆</label>

                    <input type="radio" id="rating4" name="rating" value="4" />
                    <label htmlFor="rating4">☆☆☆☆</label>

                    <input type="radio" id="rating3" name="rating" value="3" />
                    <label htmlFor="rating3">☆☆☆</label>

                    <input type="radio" id="rating2" name="rating" value="2" />
                    <label htmlFor="rating2">☆☆</label>

                    <input type="radio" id="rating1" name="rating" value="1" />
                    <label htmlFor="rating1">☆</label>
                </div>

                <textarea
                    placeholder="Tell us more about your experience..."
                    className="feedback-text"
                ></textarea>

                <button className="submit-btn">Submit</button>
            </div>
        </div>
    );
}

export default RateUsPage;
