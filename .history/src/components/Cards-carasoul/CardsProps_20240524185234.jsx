import React from "react";
import ReactCardSlider from 'react-card-slider-component';
import './CardProps.css'
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDgz3eVyH2BfjV71P6kzbcXpbTq4i27KhY1CgcyepF65m8PhHjapcC2j_pqceMb0VAGg&usqp=CAU",clickEvent:sliderClick},
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
