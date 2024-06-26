import React from "react";
import ReactCardSlider from 'react-card-slider-component';
import './CardProps.css'
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffinance.yahoo.com%2Fnews%2Farent-foolin-tri-state-area-130000404.html&psig=AOvVaw0-KfLfSzBFZta7OM8cQ8VI&ust=1716652245467000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDe55DSpoYDFQAAAAAdAAAAABAJ",clickEvent:sliderClick},
    {image:"https://picsum.photos/600/500",clickEvent:sliderClick},
    {image:"https://picsum.photos/700/600",clickEvent:sliderClick},
    {image:"https://picsum.photos/500/400",clickEvent:sliderClick},
    {image:"https://picsum.photos/200/300",clickEvent:sliderClick},
    {image:"https://picsum.photos/800/700",clickEvent:sliderClick},
    {image:"https://picsum.photos/300/400",clickEvent:sliderClick},
];

const CardsProps = () => {
  return (
    <div className="card-carousel">
    <ReactCardSlider slides={slides} />
  </div>
  );
};

export default CardsProps;
