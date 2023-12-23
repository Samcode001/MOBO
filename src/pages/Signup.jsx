import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/signup",
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
      // Redirect or handle success as needed
    } catch (error) {
      console.error("Signup error:", error.response.data);
      // Handle error (e.g., display error message)
    }
  };
  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>Signup</h2>
        <label className="label">
          Name
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="label">
          Email:
          <input
            className="input"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label className="label">
          Password:
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit" onClick={handleSubmit}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
