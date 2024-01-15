import React, { useEffect, useState } from "react";
import "../styles/UserProfilePage.css";
import useHandleUser from "../hooks/handleUser.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user } = useHandleUser();
  const [userAddress, setUserAddress] = useState([]);

  const navigate = useNavigate();

  const getAddress = async () => {
    const {
      data: { success, address },
    } = await axios.get("http://localhost:3000/admin/address", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });

    if (success) {
      setUserAddress(address);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(true);
  };

  useEffect(() => {
    getAddress();
    //   console.log("hello");
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-user-info">
          {/* <img
            src={`http://localhost:3000/uploads/${user.avatar}`}
            alt="User Avatar"
          />
          <h2>John Doe</h2> */}
        </div>
        <ul className="profile-sidebar-options">
          <li>Details</li>
          <li>My Orders</li>
          <li>Saved Addresses</li>
          <li onClick={handleLogout}>Logout</li>
          {/* Add more options as needed */}
        </ul>
      </div>
      <div className="profile-main-content">
        <div className="profile-user-details">
          <img
            src={`http://localhost:3000/uploads/${user.avatar}`}
            alt="User Avatar"
          />
          <h2>John Doe</h2>
        </div>
        <div className="profile-saved-addresses">
          {/* <h3>Saved Addresses</h3>
          <ul>
            {userAddress &&
              userAddress.map((elem, index) => {
                <li key={index}>{elem}</li>;
              })}
          </ul> */}
        </div>
        <div className="profile-previous-orders">
          <h3>Previous Orders</h3>
          <ul>
            <li>Order #001</li>
            <li>Order #002</li>
            {/* Add more previous orders */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
