import React from "react";
import ReactCardSlider from 'react-card-slider-component';
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://picsum.photos/200/300",clickEvent:sliderClick},
    {image:"https://picsum.photos/600/500",clickEvent:sliderClick},
    {image:"https://picsum.photos/700/600",clickEvent:sliderClick},
    {image:"https://picsum.photos/500/400",clickEvent:sliderClick},
    {image:"https://picsum.photos/200/300",clickEvent:sliderClick},
    {image:"https://picsum.photos/800/700",clickEvent:sliderClick},
    {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description",clickEvent:sliderClick},
];

const CardsProps = () => {
  return (
    <ReactCardSlider slides={slides}/>
  );
};

export default CardsProps;
