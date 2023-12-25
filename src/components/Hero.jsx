import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroCarousel.css"; // Create a CSS file for styling
import image1 from "../assets/phono-slider-1.webp";
import image2 from "../assets/phono-slider-2.webp";
import image3 from "../assets/phono-slider-3.webp";
// import { FaTruckFast } from "react-icons/fa";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="hero-carousel">
        <Slider {...settings}>
          <div className="hero-item">
            <img src={image1} alt="Slide 1" />
            <div className="hero-content content-1">
              <h2>ZANIA BLACK EDITION</h2>
              <h1>CURVY BEWEL</h1>
              {/* <br /> */}
              <h1>DUAL AUDIO</h1>
              <button>SHOP NOW</button>
            </div>
          </div>

          <div className="hero-item">
            <img src={image2} alt="Slide 2" />
            <div className="hero-content content-2">
              <h2>4K RESOLUTION</h2>
              <h1>EXCLUSIVE</h1>
              <h1>STEEL FRAME</h1>
              <button>SHOP NOW</button>
            </div>
          </div>

          <div className="hero-item">
            <img src={image3} alt="Slide 3" />
            <div className="hero-content content-3">
              <h2>DELTA ZERTIGA PROCESSOR</h2>
              <h1>FULL SCREEN</h1>
              <h1>DISPLAY</h1>
              <button>SHOP NOW</button>
            </div>
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </div>

     
    </>
  );
};

export default Hero;
