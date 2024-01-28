import React, { useEffect, useState } from "react";
import "../styles/UserProfilePage.css";
import useHandleUser from "../hooks/handleUser.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user, getUser } = useHandleUser();

  const [selectedOptions, setSelectedOptions] = useState("details");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(true);
  };

  const handleProfile = () => {
    switch (selectedOptions) {
      case "orders":
        return <ProfileOrders />;

        break;
      case "address":
        return <ProfileAddress />;
        break;
      case "details":
        return <ProfileDeatils user={user} />;
      default:
        return null;
        break;
    }
  };

  useEffect(() => {
    getUser();
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
          <li onClick={() => setSelectedOptions("details")}>Details</li>
          <li onClick={() => setSelectedOptions("orders")}>My Orders</li>
          <li onClick={() => setSelectedOptions("address")}>Saved Addresses</li>
          <li onClick={handleLogout}>Logout</li>
          {/* Add more options as needed */}
        </ul>
      </div>
      <div className="profile-main-content">{handleProfile()}</div>
    </div>
  );
};

export default UserProfilePage;

const ProfileDeatils = ({ user }) => {
  return (
    <>
      <div className="profile-user-details">
        <img
          src={`http://localhost:3000/uploads/${user.avatar}`}
          alt="User Avatar"
        />
        <h1>{user.name}</h1>
      </div>
    </>
  );
};

const ProfileOrders = () => {
  const orders = [
    { id: 1, product: "Product A", price: 50.99 },
    { id: 2, product: "Product B", price: 30.49 },
    { id: 3, product: "Product C", price: 25.99 },
    // Add more orders as needed
  ];
  return (
    <>
      <div className="profile-previous-orders">
        <div>
          <h2>User Orders</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orders.map((order) => (
              <li
                key={order.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Product:</strong> {order.product}
                </p>
                <p>
                  <strong>Price:</strong> ${order.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const ProfileAddress = () => {
  const [userAddress, setUserAddress] = useState([]);

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

  useEffect(() => {
    getAddress();
    //   console.log("hello");
  }, []);

  return (
    <>
      <div className="profile-saved-addresses">
        <h3 style={{ fontSize: "2rem", fontWeight: "550" }}>Address</h3>
        {userAddress &&
          userAddress.map((elem, index) => {
            return (
              <div
                key={index}
                // onClick={() => handleSelectAddress(elem)}
                style={{
                  cursor: "pointer",
                  marginBlock: "1rem",
                  backgroundColor: "rgb(217, 214, 214)",
                }}
              >
                {/* <input
                  id={index}
                  name="selectAddress"
                  style={{ display: "inline" }}
                  checked={elem === selectedAddress}
                  type="radio"
                  onChange={() => {}}
                /> */}
                <label htmlFor="selectAddress">{elem}</label>
              </div>
            );
          })}
      </div>
    </>
  );
};
