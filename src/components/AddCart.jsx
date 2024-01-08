import React, { useEffect, useState } from "react";
import "../styles/AddCart.css";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import cartState from "../recoil/atoms/cart";
// import cartState from "../recoil/atoms/cart";
import wishListState from "../recoil/atoms/wishList";

const AddCart = ({ cartFlag, setCartFlag }) => {
  const [count, setCount] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [quantityPrice, setQuantityPrice] = useState(0);
  const [cart, setCart] = useRecoilState(cartState);

  //   console.log(cart);
  const handleMinus = () => {
    if (count > 1) setCount(count - 1);
  };
  const hanldePlus = () => {
    setCount(count + 1);
  };

  const deleteCartItem = async (itemName) => {
    const res = await axios.post(
      "http://localhost:3000/cart/removeItem",
      {
        name: itemName,
      },
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (res === 201) {
      alert("Item deleted");
    }
    setCart((prevCart) => prevCart.filter((elem) => elem.name !== itemName));
  };


  //  ----------------------- For Loading data into wishlist and cart ----------------------------
  const setWishList = useSetRecoilState(wishListState);
  const getCart = async () => {
    const {
      data: { cartItems },
    } = await axios.get("http://localhost:3000/cart/getItems", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (cartItems) {
      setCart(cartItems);
    }
  };

  const getWishList = async () => {
    const {
      data: { wishListItems },
    } = await axios.get("http://localhost:3000/wishlist/getItems", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (wishListItems) {
      setWishList(wishListItems);
    }
  };

  useEffect(() => {
    getCart();
    getWishList();
    console.log(cart)
  }, []);

  // ------------------------------------- End --------------------------------------------

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    setSubTotal(total);
  }, [cart]);

  const setPrice = async () => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === itemId) {
        cart[i].price *= count;
      }
    }
  };

  useEffect(() => {}, [count]);

  return (
    <div
      className="cart-container"
      style={
        cartFlag
          ? { right: "0rem", opacity: "1" }
          : { right: "-100rem", opacity: "0" }
      }
    >
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "550" }}>Your Cart</h2>
        <IoClose
          style={{ cursor: "pointer" }}
          size={27}
          color="black"
          onClick={() => setCartFlag((prevFlag) => !prevFlag)}
        />
      </div>

      <div style={{ overflowY: "scroll", height: "70vh" }}>
        {cart &&
          cart.map((elem) => {
            return (
              <>
                <div className="cart-item">
                  <hr />
                  <div className="cart-details-container">
                    <img
                      src="https://rukminim2.flixcart.com/image/416/416/ktketu80/mobile/8/z/w/iphone-13-mlph3hn-a-apple-original-imag6vzzhrxgazsg.jpeg?q=70"
                      alt=""
                      className="cart-details-image"
                    />
                    <div className="cart-details">
                      <h2>{elem.name}</h2>
                      <span>Type: {elem.type}</span>
                      <span>Os: {elem.os},</span>
                      <span>Memory: {elem.memory},</span>
                      <h2>${elem.price}</h2>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "center",
                    }}
                  >
                    <div className="cart-quantitiy-container">
                      <FaPlus
                        size={15}
                        onClick={() => {
                          hanldePlus();
                          setPrice(elem._id);
                        }}
                      />
                      <span>{count}</span>
                      <FaMinus
                        size={15}
                        onClick={() => {
                          handleMinus();
                          setPrice(elem._id);
                        }}
                      />
                    </div>
                    <MdOutlineDeleteForever
                      style={{ cursor: "pointer" }}
                      size={30}
                      onClick={() => deleteCartItem(elem.name)}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>

      <hr />
      <div className="cart-footer">
        <div>
          <h2>Subtotal</h2>
          <span>${subTotal}.00 USD</span>
        </div>
        <p>Taxes and shipping calculated at checkout</p>
        <button className="button">Check Out</button>
      </div>
    </div>
  );
};

export default AddCart;
