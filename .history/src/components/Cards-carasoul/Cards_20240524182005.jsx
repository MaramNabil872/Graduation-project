import React, { useState } from "react";

const CardCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card-carousel">
      <button onClick={prevCard}>Previous</button>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${index === currentIndex ? "active" : ""}`}
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default CardCarousel;
