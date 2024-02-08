import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import logo from "../assets/images (1).png";
import { FaShoppingCart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import AddCart from "../components/AddCart.jsx";
import { FaHeart } from "react-icons/fa";
import AddWishlist from "./AddWishlist.jsx";
import useHandleUser from "../hooks/handleUser.js";
import { allPhonesDataState } from "../recoil/atoms/data.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

const Navbar = () => {
  const [isPage, setIsPage] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [cartFlag, setCartFlag] = useState(false);
  const [wishlistFlag, setWishlistFlag] = useState(false);
  const [navFlag, setNavFlag] = useState(false);

  const { user, getUser } = useHandleUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [phonesData, setPhonesData] = useState([]);

  const setAllPhones = useSetRecoilState(allPhonesDataState);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://mobo-service.onrender.com/data/phones",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        setAllPhones((prevData) => [...prevData, res.data.phones]);
        setPhonesData(res.data.phones);
      } else {
        console.log("Some Erro occ");
      }
    } catch (error) {
      console.log(`Error in component :${error}`);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filterPhones = phonesData.filter((product) => {
      return product.name.toLowerCase().includes(term.toLowerCase());
    });
    setSearchData(filterPhones);
  };

  useEffect(() => {
    getUser();
    getData();
    // console.log(user.avatar);
  }, []);

  const submitInput = () => {};
  return (
    <div className="container">
      <header className="primary-header">
        <div className="container">
          <div className="nav-wrapper">
            <Link className="logo" to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
            <button
              className="mobile-nav-toggle"
              aria-controls="primary-navigation"
              aria-expanded={navFlag}
              onClick={() => setNavFlag((prev) => !prev)}
            >
              <span className="visually-hidden">Menu</span>
            </button>
            <nav className="primary-navigation" aria-expanded={navFlag}>
              <ul role="list" id="primary-navigation" className="nav-list">
                <li>
                  <Link to="/">
                    <a href="#">Home</a>
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                   Shop
                  </Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/faq">Faq's</Link>
                </li>
              </ul>
            </nav>
            {/* <button className="button | display-sm-none display-md-inline-flex">

              Request Invite
            </button> */}
            <div className="right-nav">
              <AiOutlineSearch
                size={22}
                onClick={() => setIsSearch((prev) => !prev)}
              />
              {isSearch && (
                <div className="search-bar">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button>
                    <AiOutlineSearch onClick={submitInput} />
                  </button>
                  <button onClick={() => setIsSearch(false)}></button>
                  {searchData && searchData.length !== 0 ? (
                    <div className="search-items-container">
                      {searchData &&
                        searchData.slice(0, 5).map((elem) => {
                          return (
                            <Link
                              to={`/product/${elem._id}`}
                              style={{ textDecoration: "none" }}
                              onClick={() => setIsSearch((prev) => !prev)}
                            >
                              <div key={elem._id} className="search-items">
                                <img src={elem.images[0]} alt="img" />
                                <div className="search-items-deatils">
                                  <h1>{elem.name}</h1>
                                  <span>
                                    {elem.type}/{elem.processor}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : null}
                </div>
              )}
              {!user ? (
                <>
                  {" "}
                  <Link to={"/login"}>
                    <FiUser size={22} />
                  </Link>
                </>
              ) : (
                <>
                  <FaHeart
                    size={22}
                    onClick={() => setWishlistFlag((prevFlag) => !prevFlag)}
                  />
                  <FaShoppingCart
                    size={22}
                    onClick={() => setCartFlag((prevFlag) => !prevFlag)}
                  />
                  <Link to={"/profile"}>
                    <img
                      src={user.avatar?.url}
                      alt="avatar"
                      className="avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "100vmax",
                      }}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AddCart cartFlag={cartFlag} setCartFlag={setCartFlag} />
      <AddWishlist
        wishlistFlag={wishlistFlag}
        setWishlistFlag={setWishlistFlag}
      />
    </div>
  );
};

export default Navbar;
