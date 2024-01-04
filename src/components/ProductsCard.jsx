import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import "../styles/ProductsCard.css";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import axios from "axios";
import useAddToCart from "../hooks/addToCart";
import cartState from "../recoil/atoms/cart";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  // const [open, setOpen] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);

  const { addToCart } = useAddToCart();

  const id = data._id;

  const handleCart = async () => {
    await addToCart(data);
  };
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

  useEffect(() => {
    getCart();
  }, []);

  //   const product_name = d.replace(/\s+/g, "-"); // This product_name will be used in url for redirecting to product page so we need to change the all the ' ' spaces ("\s+") in the product name (d=data.name) to hyphens "-", so the product_name can be URL Friendly String

  return (
    <div className="card-container">
      <div>
        <Link to={`/product/${id}`}>
          <img
            src={data.images[0]}
            alt=""
            style={{
              width: "18rem",
              height: "17rem",
              borderRadius: "1rem",
              objectFit: "contain",
            }}
          />
        </Link>
      </div>
      {/* <Link to={"/"}>{data.shop.name}</Link> */}
      <div>
        <Link to={`/product/${id}`} className="card-details">
          <h4 style={{ fontSize: "1.2rem" }}>
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="stars">
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiOutlineStar color={"#F6BA00"} />
          </div>

          <div>
            <div>{/* <h4>{data.price ? data.price + "$" : null}</h4> */}</div>
            <h5 style={{ marginBottom: "0.4rem" }}>
              {/* We are doing this because in data some prices are not given so we can use the discount_price  */}
              {data.price} $
            </h5>
            <span>20 sold</span>
          </div>
        </Link>
      </div>

      {/* side options */}
      <div className="side-options">
        {click ? (
          <AiFillHeart
            size={22}
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineShoppingCart
          size={25}
          onClick={handleCart}
          style={{ cursor: "pointer" }}
          color="#444"
          title="Add to cart"
        />
      </div>

      <div className="buttons">
        <button className="button" onClick={handleCart}>
          Add Cart
        </button>
        <button className="button-buy">Buy</button>
      </div>
    </div>
  );
};

export default ProductCard;
