import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar.jsx";
import "../styles/Hero.css";
import image1 from "../assets/free-deliver-icon.webp";
import image2 from "../assets/offers-icon.webp";
import image3 from "../assets/support-icon.webp";

import ic11_Image from "../assets/ic11.webp";
import ic12_Image from "../assets/ic12.webp";
import ic13_image from "../assets/ic13.avif";

const Home = () => {
  return (
    <div>
      {/* <Header/> */}
      <Hero />

      <div className="cta">
        <div className="cta-items">
          <img src={image1} alt="" />
          {/* <FaTruckFast /> */}
          <div>
            <h4>FREE SHIPPING</h4>
            <span>For orders over 600Rs</span>
          </div>
        </div>
        <div className="cta-items">
          <img src={image2} alt="" />
          <div>
            <h4>OFFICIAL DISCOUNTS</h4>
            <span>Save Big on next product</span>
          </div>
        </div>
        <div className="cta-items">
          <img src={image3} alt="" />
          <div>
            <h4>24/7 HELPLINE</h4>
            <span>Care till the end</span>
          </div>
        </div>
      </div>

      <div className="cta2">

        <h2>WHAT MAKES THE ESSENTIAL DIFFERENT?</h2>
        <h4>EXPERIENCE HIGH PERFORMANCE AND SECURE</h4>

        <div className="cta2-grid">
          <div className="cta2-items">
            <img src={ic12_Image} alt="IC11-Image" />
            <h4>PERFECT CUT</h4>
            <h2>DUAL CAMERA</h2>
            <p>Tristique senectus et netus et malesuada ant reiet fames.</p>
          </div>
          <div className="cta2-items">
            <img src={ic13_image} alt="IC12-Image" />
            <h4>PRETTY</h4>
            <h2>INTELLIGENT PROCESSING</h2>
            <p>
              Consequat ac habit amet asse felis donec et odio pellentesque
              diam.
            </p>
          </div>
          <div className="cta2-items">
            <img src={ic11_Image} alt="IC13-Image" />
            <h4>MOST POPULAR</h4>
            <h2>8GB DDR5 RAM</h2>
            <p>
              Dictum varius duis at consectetur lorem donec massa sap faucibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
