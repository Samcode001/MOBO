import React from "react";
import '../styles/ProductDetails.css'

const ProductDetails = ({ data }) => {
  return (
    <>
      <div className="product-container">
        <div className="left">
          <div className="main-image item-1">
            <img src={data.images[0]} alt="" />
          </div>
          <div className="images item-2">
            <img src={data.images[1]} alt="" />
          </div>
          <div className="images item-3">
            <img src={data.images[2]} alt="" />
          </div>
          <div className="images item-4">
            <img src={data.images[2]} alt="" />
          </div>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default ProductDetails;
