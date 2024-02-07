import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useHandleUser from "../hooks/handleUser";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { getUser } = useHandleUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUser = async () => {
    await getUser();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mobo-service.onrender.com/admin/login",
        formData
      );

      if (response.status === 200) {
        handleUser();
        navigate("/");
        window.location.reload(true);
        localStorage.setItem("token", response.data.token);
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
        <h2 className="form-heading">Login</h2>
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
        <button
          style={{ marginBottom: "1rem" }}
          className="button"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <br />
        <hr />
        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <h2 style={{ margin: "1rem 0rem" }}>Create New Account</h2>
        </Link>
      </div>
    </div>
  );
};

export default Login;
