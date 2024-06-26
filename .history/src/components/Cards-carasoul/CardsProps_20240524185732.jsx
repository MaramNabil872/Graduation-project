import React from "react";
import ReactCardSlider from 'react-card-slider-component';
import './CardProps.css'
const sliderClick = () => {
    // Your click event handler logic
  };
const slides = [
    {image:"https://cdn4.arabiccoupon.com/sites/default/files/styles/wide_banner/public/offers/2019-06-june-_-pizzahut-arabiccoupon-offer-deal-buy1get1free-en_0.jpg",clickEvent:sliderClick},
    {image:"https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg",clickEvent:sliderClick},
    {image:"https://www.sappbros.net/admin/resources/bb-opening-offer.jpg",clickEvent:sliderClick},
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjaPzvUc4nGCZFNs6ZC6Y4Eyv9cBuEAJYbbXiaW4wqjFUIHPfc7QVtYJN4LylzZEYEIFI&usqp=CAU",clickEvent:sliderClick},
    {image:"https://cdn.grabon.in/gograbon/images/merchant/1547301266015.png",clickEvent:sliderClick},
  
];

const CardsProps = () => {
  return (
    <div className="card-carousel">
    <ReactCardSlider slides={slides} />
  </div>
  );
};

export default CardsProps;
