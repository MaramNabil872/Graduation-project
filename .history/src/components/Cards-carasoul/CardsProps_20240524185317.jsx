import React from "react";
import ReactCardSlider from 'react-card-slider-component';
import './CardProps.css'
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://s.yimg.com/ny/api/res/1.2/sqmFWMw9rMD.q5QW0eqpJA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/prnewswire.com/b58a8c66e92ec20c1fd59c0d28baf429",clickEvent:sliderClick},
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
