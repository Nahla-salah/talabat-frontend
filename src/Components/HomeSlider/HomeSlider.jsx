import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import img1 from '../../assets/Imgs/food_web_banner_13.jpg';
import img2 from '../../assets/Imgs/Food-Web-Banner-19.jpg';
import img6 from '../../assets/Imgs/front-view-burger-with-french-fries.jpg';
import img5 from '../../assets/Imgs/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table.jpg';
import img3 from '../../assets/Imgs/top-view-table-full-food.jpg';
import img4 from '../../assets/Imgs/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food.jpg';


const SliderComponent = Slider.default || Slider;

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="container mx-auto py-8">
    
      <SliderComponent {...settings} className="w-full md:w-[80%] m-auto">
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img1} alt="food 1" />
        </div>
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img2} alt="food 2" />
        </div>
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img3} alt="food 3" />
        </div>
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img4} alt="food 4" />
        </div>
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img5} alt="food 5" />
        </div>
        <div className="px-2">
          <img className="rounded w-full block h-[300px] object-cover" src={img6} alt="food 6" />
        </div>
      </SliderComponent>
    </div>
  );
}