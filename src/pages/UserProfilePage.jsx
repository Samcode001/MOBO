import React, { useEffect, useState } from "react";
import "../styles/UserProfilePage.css";
import useHandleUser from "../hooks/handleUser.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoil/atoms/user.js";

const UserProfilePage = () => {
  // const { getUser } = useHandleUser();

  const [selectedOptions, setSelectedOptions] = useState("details");
  // const user = useRecoilValue(userState);

  const navigate = useNavigate();

  // const getUser = async () => {
  //   const { data } = await axios.post(
  //     "http://localhost:3000/admin/getUser",
  //     {},
  //     {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     }
  //   );
  // };

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
        return <ProfileDeatils />;
      default:
        return null;
        break;
    }
  };

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

const ProfileDeatils = () => {
  const { user, getUser } = useHandleUser();

  useEffect(() => {
    getUser();
  }, []);

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
  // const orders = [
  //   { id: 1, product: "Product A", price: 50.99 },
  //   { id: 2, product: "Product B", price: 30.49 },
  //   { id: 3, product: "Product C", price: 25.99 },
  //   // Add more orders as needed
  // ];

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:3000/orders/order", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (data.success) {
      setOrders(data.orders.orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="profile-previous-orders">
        <div>
          <h2 style={{fontSize:'3rem',fontWeight:"600"}}>User Orders</h2>
          <ul className="previous-orders-container">
            {orders.map((order) => (
              <div key={order.id} className="previous-orders-items">
                <p
                  style={{ fontSize: "1rem", fontWeight: "300", color: "gray" }}
                >
                  {/* <strong>Order ID:</strong> {order.id} */}
                  Order Id:{order.orderId}
                </p>
                <ul className="previos-orders-images">
                  {order.order.slice(0,5).map((elem, index) => {
                    return (
                      <li key={index}>
                        <a href="#">
                          <img src={elem.img} alt="" />
                        </a>
                      </li>
                    );
                  })}
{/* 
                  <li>
                    <a href="#">
                      <img
                        src="https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iii-02.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iii-02.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iii-02.jpg"
                        alt=""
                      />
                    </a>
                  </li> */}
                </ul>
                <p>
                  <strong style={{ color: "red" }}>Total:</strong> Rs.
                  {order.total}/-
                </p>
              </div>
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
