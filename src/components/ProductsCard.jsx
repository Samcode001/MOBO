import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;

  const product_name = d.replace(/\s+/g, "-"); // This product_name will be used in url for redirecting to product page so we need to change the all the ' ' spaces ("\s+") in the product name (d=data.name) to hyphens "-", so the product_name can be URL Friendly String

  return (
    <>
      <div>
        <div></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={data.images[0]}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        {/* <Link to={"/"}>{data.shop.name}</Link> */}
        <Link to={`/product/${product_name}`}>
          <h4>
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div>
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiFillStar color={"#F6BA00"} />
            <AiOutlineStar color={"#F6BA00"} />
          </div>

          <div>
            <div>
              <h5>
                {/* We are doing this because in data some prices are not given so we can use the discount_price  */}
                {data.price} $
              </h5>
              <h4>{data.price ? data.price + "$" : null}</h4>
            </div>
            <span>20 sold</span>
          </div>
        </Link>

        {/* side options */}
        <div>
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
          <AiOutlineEye
            size={22}
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            onClick={() => setOpen(!open)}
            color="#444"
            title="Add to cart"
          />
          {/* {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null} */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
