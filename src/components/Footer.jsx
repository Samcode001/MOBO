import React from "react";
import "../styles/Footer.css";
import logo from "../assets/images (1).png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <footer class="primary-footer">
        <div class="container">
          <div class="primary-footer-wrapper">
            <div>
              <a href="#">
                <img
                  style={{ filter: "invert(100%)" }}
                  class="footer-logo"
                  src={logo}
                  alt="footer-logo"
                />
              </a>
              <ul role="list" class="primary-footer-navigation  animated">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/faq">Faq's</Link>
                </li>
                <li>
                  <Link to="/">Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <span>&copy; 2023 MOBO. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
