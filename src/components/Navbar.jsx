import React, { useState } from "react";
import "../styles/Header.css";
import logo from "../assets/images (1).png";
import { FaShoppingCart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const options = [
    "SSD CARD",
    "Affinity M20",
    "Affinity P40 Pro",
    "PO V40 ThinQ",
    "Tencho 7.3",
    "Tencho 8.1",
    "Nexian",
    "Ningbo",
    "Fix A Phone",
    "Hisense",
    "Force Cell",
    "POWER BANKS",
    "Spots 8 Lite",
    "Spots ERA 5X",
    "Tencho 8.1",
    "Phonelink",
    "Musah",
    "Connect 4",
    "Alcatel",
    "MobiAir",
    "Beat Cell",
    "Hunk Cell",
    "EARPHONE",
    "Spots Y93 1815",
    "Tencho F12 Pro",
    "Telefonika",
    "T-Blast",
    "Alcatel",
    "Ampy",
    "Crystal Cell",
    "MOI Cell",
    "Groove Cell",
    "Olly Cell",
    "ANDROID",
    "Tencho 10 Lite",
    "Tencho 7.3",
    "Spectrum",
    "Hisense",
    "Bluesky",
    "GreatDid",
    "Mastic",
    "Pigeon Cell",
    "Arise Cell",
    "Ritz Cell",
  ];

  const [isPage, setIsPage] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const submitInput = () => {};
  return (
    <div>
      <header className="primary-header">
        <div className="container">
          <div className="nav-wrapper">
            <a className="logo" href="#">
              <img src={logo} alt="logo" />
            </a>
            <button
              className="mobile-nav-toggle"
              aria-controls="primary-navigation"
              aria-expanded="false"
            >
              <span className="visually-hidden">Menu</span>
            </button>
            <nav className="primary-navigation">
              <ul role="list" id="primary-navigation" className="nav-list">
                <li>
                  <a href="#">Home</a>
                </li>
                <li
                  className="dropdown"
                  onMouseEnter={() => setIsCollection(true)}
                  onMouseLeave={() => setIsCollection(false)}
                >
                  <a href="#">Collection</a>
                  {isCollection && (
                    <div
                      className="dropdown-content"
                      style={{ width: "70vw", top: "4rem", left: "-18rem" }}
                    >
                      <div className="dropdown-options">
                        {options.map((option) => (
                          <div
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Android</a>
                </li>
                <li
                  className="dropdown"
                  onMouseEnter={() => setIsPage(true)}
                  onMouseLeave={() => setIsPage(false)}
                >
                  <a href="#">Pages</a>
                  {isPage && (
                    <div className="dropdown-content">
                      <a href="#">About</a>
                      <a href="#">Carrers</a>
                      <a href="#">Blogs</a>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
            {/* <button className="button | display-sm-none display-md-inline-flex">

              Request Invite
            </button> */}
            <div className="right-nav">
              <FaShoppingCart />
              <FiUser />
              <AiOutlineSearch onClick={() => setIsSearch(true)} />
              {isSearch && (
                <div className="search-bar">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={() => setSearchInput(e.target.value)}
                  />
                  <button>
                    <AiOutlineSearch onClick={submitInput} />
                  </button>
                  <button onClick={() => setIsSearch(false)}></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;