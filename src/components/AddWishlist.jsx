import React, { useEffect, useState } from 'react'
import '../styles/AddCart.css'
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import cartState from "../recoil/atoms/cart";


const AddWishlist = ({wishlistFlag,setWishlistFlag}) => {
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
  
    const deleteCartItem = async (itemId) => {
      const res = await axios.post(
        "http://localhost:3000/cart/removeItem",
        {
          id: itemId,
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
      setCart((prevCart) => prevCart.filter((elem) => elem._id !== itemId));
    };
  
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
  return (
    <div
      className="cart-container"
      style={
        wishlistFlag
          ? { right: "0rem", opacity: "1" }
          : { right: "-100rem", opacity: "0" }
      }
    >
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "550" }}>Your WishList</h2>
        <IoClose
          style={{ cursor: "pointer" }}
          size={27}
          color="black"
          onClick={() => setWishlistFlag((prevFlag) => !prevFlag)}
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
                      {/* <h2>${elem.price}</h2> */}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "center",
                      alignItems:"center"
                    }}
                  >
                    <div className="">
                      {/* <FaPlus
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
                      /> */}
                      <button className='button'>Add to cart</button>
                    </div>
                    <MdOutlineDeleteForever
                      style={{ cursor: "pointer" }}
                      size={32}
                      onClick={() => deleteCartItem(elem._id)}
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
  )
}

export default AddWishlist