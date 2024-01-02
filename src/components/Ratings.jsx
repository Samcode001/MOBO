import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";


const Ratings = ({ id, getRatings }) => {
  const fullRating = 5;

  const [review, setReview] = useState(0);
  const [title, setTitle] = useState(""); // for review title
  const [desc, setDesc] = useState(""); // for review description

  const handleRating = (newRating) => {
    setReview(newRating);
    // console.log(newRating) // the value of rating to store in database
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/data/set-rating",
        {
          id: id,
          rate: review,
          title: title,
          desc: desc,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      //  console.log(review,title,desc);

      if (res.status === 200) {
        alert("Review Submitted");
        setReview(0);
        setTitle("");
        setDesc("");
      }
      getRatings();
    } catch (error) {
      console.log(`Error in Rating Component:${error}`);
    }
  };

  useEffect(() => {
    // const tempData = calcRating();
    // setReview(tempData);
  }, []);

  return (
    <div className="rating-container">
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: "550",
          marginBottom: "0.5rem",
        }}
      >
        Write a Review
      </h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Stars
            key={value}
            filled={value <= review}
            onClick={() => handleRating(value)}
          />
        ))}
      </div>
      <label htmlFor="title">Review Title</label>
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="desc">Review Body(1500 Words)</label>
      <input
        type="text"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        className="button-buy"
        style={{ marginBlock: "1rem" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <br />
      <hr />
    </div>
  );
};

const Stars = ({ filled, onClick }) => {
  return (
    <div>
      <FaStar size={20} color={filled ? "orange" : "gray"} onClick={onClick} />
    </div>
  );
};

export default Ratings;
