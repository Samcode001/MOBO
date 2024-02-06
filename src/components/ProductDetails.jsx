import React, { useEffect, useState } from "react";
import "../styles/ProductDetails.css";
import { useRecoilValue } from "recoil";
import ProductCard from "./ProductsCard";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Ratings from "../components/Ratings.jsx";
import GeneraetStars from "../components/GeneraetStars.jsx";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import axios from "axios";
import { allPhonesDataState } from "../recoil/atoms/data.js";
import useAddToCart from "../hooks/addToCart.js";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(data.price);
  const [descFlag, setDescFlag] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [writeReview, setWriteReview] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const { addToCart } = useAddToCart();

  const navigate = useNavigate();

  const allPhones = useRecoilValue(allPhonesDataState);

  const parsedData = allPhones.slice(5, 9);

  const productPermalink = `http://localhost:5173/products/${data._id}`;

  const handleplus = () => setCount(count + 1);
  const handleminus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleShareClick = async () => {
    try {
      await navigator.share({
        title: data.name,
        text: data.type,
        url: productPermalink,
      });
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  // const handleRatingChange = (newRating) => {
  //   setRating(newRating);
  // };

  const hanldeCart = async () => {
    await addToCart(data);
  };

  const getRatings = async (id) => {
    const res = await axios.post(
      "http://localhost:3000/data/ratings",
      {
        id: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 200) {
      setRatings(res.data.ratings);

      const ratingsData = res.data.ratings;
      let averageRating = 0;
      for (let i = 0; i < ratingsData.length; i++) {
        averageRating += ratingsData[i].rate;
      }
      averageRating = Math.ceil(averageRating / ratingsData.length);
      setTotalRatings(averageRating);
    }
  };

  useEffect(() => {
    getRatings(data._id);
    setTotal(data.price * count);
  }, []);

  useEffect(() => {
    setTotal(data.price * count);
  }, [count]);

  return (
    <>
      <div className="product-container">
        <div className="product-left">
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
        <div className="product-right">
          <h2>{data.name}</h2>
          <span style={{ fontSize: "1.2rem", fontWeight: "550" }}>
            ₹ {data.price}
          </span>

          <h3>
            Type <span>{data.type}</span>
          </h3>
          <h3>
            Processor <span>{data.processor}</span>
          </h3>
          <h3>
            Memory <span>{data.memory}</span>
          </h3>
          <h3>
            Os <span>{data.os}</span>
          </h3>
          {/* 
          <div className="quantity">
            Quantity
            <FaMinus
              style={{ cursor: "pointer" }}
              size={20}
              onClick={handleminus}
            />
            {count}
            <FaPlus
              style={{ cursor: "pointer" }}
              size={20}
              onClick={handleplus}
            />
          </div>
          <span style={{ fontSize: "1.2rem", fontWeight: "550" }}>
            SubTotal{" "}
            <span style={{ color: "rgb(236, 57, 17)", paddingLeft: "1rem" }}>
              ₹ {total}
            </span>
          </span> */}

          <div className="product-buttons">
            <button className="button" onClick={hanldeCart}>
              Add TO Cart
            </button>
            <button
              className="button-buy"
              onClick={() => navigate(`/buy/${data._id}`)}
            >
              Buy Now
            </button>
            <button className="share-button" onClick={handleShareClick}>
              <IoMdShare size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="product-description">
        <div className="desc-buttons">
          <h2 onClick={() => setDescFlag(!descFlag)}>Description</h2>
          <h2 onClick={() => setDescFlag(!descFlag)}>Shipping & Returns</h2>
        </div>
        {descFlag === true ? (
          <>
            <p>
              Mobile phones are pivotal in our daily lives. Living without a
              mobile phone is challenging in this contemporary environment. A
              mobile phone is a broadband network that is a compact, small
              device used to send and receive speech, video, and other data
              types. Mobile phone usage offers additional benefits and features.
            </p>
            <h4>Design and Build</h4>
            <p>
              It distinguishes out from the other smartphone competitors because
              of its fresh, sophisticated colors, which when combined with TFT
              LCD Display, give it a luxurious appearance. Its approximate
              weight is 195.00 g dimensions are 164.5 x 76.9 x 8.4mm making it
              convenient and comfortable to hold. This phone includes Bluetooth
              and GPS connectivity as well as expandable storage.
            </p>

            <h4>Display and Screen</h4>
            <p>
              A 6.20-inch screen with a resolution of 1080x2340 pixels displays
              all types of entertainment great, and the colors appear to be
              rather realistic. Standard Wi-Fi is supported up to 802.11 b/g/n
              with Type-C USB. As its vendor Sensors like Face unlock,
              Fingerprint, Proximity and Accelerometer are supported. The
              speaker grill and audio jack are located at the bottom.
            </p>
            <h4>Hardware and Performance</h4>
            <p>
              The latest smartphone features a 14nm chipset-based 1.8GHz
              Octa-core Exynos 7904 processor with 4GB of RAM and 64GB of
              storage. The 5000mAh battery is compatible with the Aspect ratio
              19.5:9.The phone is among the best performances in its category
              because of this combination. On low-end hardware, the Experience
              UI for phones has been tuned to operate without a hitch. The icons
              and appearance are nearly identical to One UI. The software is
              reliable, sophisticated, and enjoyable.
            </p>
          </>
        ) : (
          <>
            <h4>Returns Policy</h4>
            <p>
              You may return most new, unopened items within 30 days of delivery
              for a full refund. We'll also pay the return shipping costs if the
              return is a result of our error (you received an incorrect or
              defective item, etc.). You should expect to receive your refund
              within four weeks of giving your package to the return shipper,
              however, in many cases you will receive a refund more quickly.
              This time period includes the transit time for us to receive your
              return from the shipper (5 to 10 business days), the time it takes
              us to process your return once we receive it (3 to 5 business
              days), and the time it takes your bank to process our refund
              request (5 to 10 business days). If you need to return an item,
              simply login to your account, view the order using the 'Complete
              Orders' link under the My Account menu and click the Return
              Item(s) button. We'll notify you via e-mail of your refund once
              we've received and processed the returned item.
            </p>
            <h4>Shipping</h4>
            <p>
              We can ship to virtually any address in the world. Note that there
              are restrictions on some products, and some products cannot be
              shipped to international destinations. When you place an order, we
              will estimate shipping and delivery dates for you based on the
              availability of your items and the shipping options you choose.
              Depending on the shipping provider you choose, shipping date
              estimates may appear on the shipping quotes page. Please also note
              that the shipping rates for many items we sell are weight-based.
              The weight of any such item can be found on its detail page. To
              reflect the policies of the shipping companies we use, all weights
              will be rounded up to the next full pound.
            </p>
          </>
        )}
      </div>

      <div className="customer-review">
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "550",
            marginBottom: "1rem",
          }}
        >
          Customer review
        </h2>
        <div className="review-header">
          <div style={{ display: "flex", gap: "5px" }}>
            {<GeneraetStars rating={totalRatings} size={25} />}
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                marginInlineStart: "1rem",
              }}
            >
              Based on {ratings.length} reviews
            </h2>
          </div>
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "550",
              cursor: "pointer",
            }}
            onClick={() => setWriteReview((prevFlag) => !prevFlag)}
          >
            {!writeReview ? "Write a Review" : " Close"}
          </h3>
        </div>
        <br />
        <hr />
        <div
          style={{
            marginBlock: "1rem",
            display: `${writeReview ? "block" : "none"}`,
          }}
        >
          <Ratings id={data._id} getRatings={getRatings} />
        </div>

        <div className="ratings">
          {ratings &&
            ratings.map((elem) => {
              return (
                <div key={elem._id}>
                  <div style={{ marginBlock: "0.5rem" }}>
                    <GeneraetStars rating={elem.rate} size={18} />
                  </div>
                  <span>{elem.title}</span>
                  <div>
                    <span>{elem.user}</span>
                    <p style={{ marginInline: "0.6rem", display: "inline" }}>
                      on
                    </p>
                    <span>{elem.date}</span>
                  </div>
                  <p>{elem.description}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "600" }}>
          Related Products
        </h1>
      </div>

      <div className="related-container">
        {parsedData &&
          parsedData.map((elem) => (
            <ProductCard
              key={elem._id}
              data={elem}
              onClick={async () => {
                await getRatings(elem._id);
                window.scrollTo(0, 0);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default ProductDetails;
