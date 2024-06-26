import React, { useState } from 'react';
import './RateUs.css'; // Import CSS file
import Header from '../../components/Header/Header';

const RateUsPage = () => {
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = () => {
        // Validate if rating is selected
        if (rating === null) {
            console.log('Please select a rating.');
            return;
        }

        // Handle submission logic here (e.g., send rating and feedback to backend, display thank you message, etc.)
        console.log('Rating submitted:', rating);
        console.log('Feedback:', feedback);

        // Reset state after submission (optional)
        setRating(null);
        setFeedback('');
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
                    value={feedback}
                    onChange={handleFeedbackChange}
                ></textarea>

                <button className="submit-btn" onClick={handleSubmit} disabled={!rating}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default RateUsPage;
