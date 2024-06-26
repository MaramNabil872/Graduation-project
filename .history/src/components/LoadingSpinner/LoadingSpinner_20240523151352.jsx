import React from 'react';
import './LoadingSpinner.css'; // You might need to create a CSS file for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
