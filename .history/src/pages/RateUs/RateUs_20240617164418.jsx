import React, { useState } from 'react';
import './RateUs.css'; // Import CSS file
import Header from '../../components/Header/Header';

const RateUsPage = () => {
    const [rating, setRating] = useState(null);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = () => {
        // Handle submission logic here (e.g., send rating to backend, display thank you message, etc.)
        console.log('Rating submitted:', rating);
        // Reset rating after submission (optional)
        setRating(null);
    };

    return (
        <div className="rate-us-container">
            <Header />
            <div className="content">
                <h1>Rate Us</h1>
                <p>We value your feedback. Please take a moment to rate your experience with DishDash.</p>
                <div className="rating-options">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <React.Fragment key={value}>
                            <input
                                type="radio"
                                id={`rating${value}`}
                                name="rating"
                                value={value}
                                checked={rating === value}
                                onChange={() => handleRatingChange(value)}
                            />
                            <label htmlFor={`rating${value}`}>★</label>
                        </React.Fragment>
                    ))}
                </div>

                <textarea
                    placeholder="Tell us more about your experience..."
                    className="feedback-text"
                ></textarea>

                <button className="submit-btn" onClick={handleSubmit} disabled={!rating}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default RateUsPage;
