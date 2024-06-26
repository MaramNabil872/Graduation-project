import React from "react";
import ReactCardSlider from 'react-card-slider-component';
import './CardProps.css'
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://cdn4.arabiccoupon.com/sites/default/files/styles/wide_banner/public/offers/2019-06-june-_-pizzahut-arabiccoupon-offer-deal-buy1get1free-en_0.jpg",clickEvent:sliderClick},
    {image:"https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg",clickEvent:sliderClick},
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
