import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Hero.css";
import { useSetRecoilState } from "recoil";
import { dataState } from "../store/data.js";
import axios from "axios";
import ProductsCard from "../components/ProductsCard";

import image1 from "../assets/free-deliver-icon.webp";
import image2 from "../assets/offers-icon.webp";
import image3 from "../assets/support-icon.webp";
import ic11_Image from "../assets/ic11.webp";
import ic12_Image from "../assets/ic12.webp";
import ic13_image from "../assets/ic13.avif";
import cta3_image from "../assets/cta3-image.webp";
import cta3_battery from "../assets/cta3-battery.png";
import cta3_sim from "../assets/cta3-sim.webp";
import cta3_processor from "../assets/cta3-processor.webp";
import cta3_camera from "../assets/cta3-camera.webp";

const Home = () => {
  const setData = useSetRecoilState(dataState);
  const [parsedData, setParsedData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/data/phones");
      if (res.status === 200) {
        setData((prevData) => [...prevData, res.data.phones]);
        setParsedData(res.data.phones.slice(0, 4));
      } else {
        console.log("Some Erro occ");
      }
    } catch (error) {
      console.log(`Error in component :${error}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
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

      <div className="cta3">
        <h2>POSSIBILITIES. PERFORMANCE. POWER.</h2>
        <span>FASTER PROCESSING WITH LESS POWER</span>
        <img src={cta3_image} alt="cta-image" />
        <div>
          <div className="cta3-items item-1">
            <div className="cta3-circle1">
              <div className="cta3-line1"></div>
            </div>

            <img src={cta3_processor} alt="processor-image" />
            <h2>SCORPION PROCESSOR</h2>
            <span>
              Tristique senectus et netus et malesuada fames ac turpis.
            </span>
          </div>
          <div className="cta3-items item-2">
            <div className="cta3-circle2">
              <div className="cta3-line2"></div>
            </div>
            <img src={cta3_sim} alt="sim-image" />
            <h2>DUAL SIM CARDS</h2>
            <span>
              Donec ultrices tincidunt arcu non sodales neque sodales ut.
            </span>
          </div>
          <div className="cta3-items item-3">
            <div className="cta3-circle1">
              <div className="cta3-line1"></div>
            </div>
            <img src={cta3_camera} alt="camera-image" />
            <h2>48 MP CAMERA</h2>
            <span>
              Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed.
            </span>
          </div>
          <div className="cta3-items item-4">
            <div className="cta3-circle2">
              <div className="cta3-line2"></div>
            </div>
            <img src={cta3_battery} alt="battery-image" />
            <h2>48 HRS BACKUP</h2>
            <span>
              Natoque penatibus et magnis dis parturient montes nascetur.
            </span>
          </div>
        </div>
      </div>

      <div className="items-section">
        {parsedData &&
          parsedData.map((elem) => <ProductsCard key={elem.id} data={elem} />)}
        {console.log(parsedData)}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
