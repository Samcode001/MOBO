import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import "../styles/CheckOut.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import cartState from "../recoil/atoms/cart";
import Navbar from "../components/Navbar";
import useAddToCart from "../hooks/addToCart";
import useGetCart from "../hooks/getCart";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const CheckOutPage = () => {
  /// ***********************------------ State for getting Address ------------- ****************************8
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressFlag, setAddressFlag] = useState(false);
  //   the operator '?.' is called optional chaining operator
  //   selectedCountry?.isoCode
  //   const isoCode=selectedCountry ? selectedCountry.isoCode : undefined ;

  /// *******************---------- states for checkout page --------------**************************
  const paymentsOptions = ["Stripe", "Razorpay", "Cash On Delivery"];
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [phone, setPhone] = useState("");
  const { cart, getCart } = useGetCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deliveryAddress = {
      name: firstName + " " + lastName,
      address: address,
      City: selectedCity.name,
      State: selectedState.name,
      Country: selectedCountry.name,
      Pincode: pincode,
    };

    const {
      data: { success, message },
    } = await axios.post(
      "http://localhost:3000/admin/address",
      {
        address: deliveryAddress,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (success) {
      setAddressFlag(true);
      getAddress();
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      setFirstName("");
      setLastName("");
      setAddress("");
      setPincode("");
    }
  };

  const getAddress = async () => {
    const {
      data: { success, message, address },
    } = await axios.get("http://localhost:3000/admin/address", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });

    if (success) {
      setAddressFlag(true);
      // address.forEach((elem) => {
      //   let tempAddress = elem;
      //   const foramtAddress = `
      //   ${tempAddress.address} ,
      //   ${tempAddress.City},
      //   ${tempAddress.State},
      //   ${tempAddress.Country} (
      //     ${tempAddress.Pincode});
      //     `;
      //   const filterAddress = userAddress.filter(
      //     (elem) => elem !== foramtAddress
      //   );
      // });
      setUserAddress(address);
      toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSelectAddress = (elem) => {
    setSelectedAddress(elem);
  };
  const handleSelectPayment = (elem) => {
    setSelectedPayment(elem);
  };

  useEffect(() => {
    getCart();
    getAddress();

    let tempSum = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    setSubTotal(tempSum);
    tempSum += tempSum * 0.08;
    setTotalSum(tempSum);
  }, []);

  return (
    <div>
      {addressFlag ? (
        <>
          <div className="checkout-container">
            <div className="checkout-left">
              <div className="checkout-contact">
                <label htmlFor="contact">Contact</label>
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <div
                className="checkout-address"
                style={{ backgroundColor: "rgb(217, 214, 214)" }}
              >
                <h2>Address</h2>
                <div style={{ overflowY: "scroll", marginBottom: "0.6rem" }}>
                  {console.log(userAddress)}
                  {userAddress &&
                    userAddress.map((elem, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handleSelectAddress(elem)}
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            id={index}
                            name="selectAddress"
                            style={{ display: "inline" }}
                            checked={elem === selectedAddress}
                            type="radio"
                            onChange={() => {}}
                          />
                          <label htmlFor="selectAddress">{elem}</label>
                        </div>
                      );
                    })}
                  {/* <input type="radio" /> <p>{userAddress}</p> */}
                </div>
                <button
                  className="button-buy"
                  onClick={() => setAddressFlag(false)}
                >
                  Add new Address..
                </button>
              </div>
              <div className="checkout-payment-options">
                <h2>Payment</h2>
                <div>
                  {paymentsOptions.map((elem, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleSelectPayment(elem)}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          id={elem}
                          name="selectPayment"
                          style={{ display: "inline" }}
                          checked={elem === selectedPayment}
                          type="radio"
                          onChange={() => {}}
                        />
                        <label htmlFor="selectAddress">{elem}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="button">Order Now</button>
            </div>
            <div className="checkout-right">
              <div>
                <div className="checkout-right-container">
                  <div>
                    {cart &&
                      cart.map((elem) => {
                        return (
                          <div key={elem._id} className="checkout-right-items">
                            <div style={{ position: "relative" }}>
                              <img src={elem.img} alt="" />
                              <span className="checkout-right-quantity">
                                {elem.quantity}
                              </span>
                            </div>
                            <div className="checkout-right-items-details">
                              <h3>{elem.name}</h3>
                              <span>
                                {elem.type}/{elem.memory}/{elem.os}
                              </span>
                            </div>
                            <h2>${elem.price}</h2>
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <div>
                      <h3>Subtotal</h3> <h2>${subTotal}</h2>
                    </div>
                    <div>
                      <h3> Shipping </h3>{" "}
                      <p style={{ maxWidth: "25ch" }}>
                        {" "}
                        {selectedAddress
                          ? selectedAddress
                          : "Please Select the address"}
                      </p>
                    </div>
                    <div>
                      <h3>
                        Estimated taxes
                        {/* <span>&#63;</span> */}
                      </h3>
                      <h2>${subTotal * 0.08}</h2>
                    </div>
                    <div>
                      <h2> Total</h2>{" "}
                      <h2>
                        <span style={{ fontWeight: "100", fontSize: "1rem" }}>
                          USD
                        </span>{" "}
                        ${totalSum}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={addressFlag ? { display: "none" } : { display: "block" }}
            className="address-overlay-container"
          >
            <div className="address-modal">
              <div className="address-modal-banner">Enter Delevery Address</div>
              <IoClose size={25} />
              <form>
                <div
                  className="adrress-name-section"
                  style={{ display: "flex", gap: "1rem" }}
                >
                  <input
                    type="text"
                    placeholder="Firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Select
                  options={Country.getAllCountries()}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCountry}
                  onChange={(item) => {
                    setSelectedCountry(item);
                  }}
                  className="address-select"
                  placeholder="Country/Region"
                />

                <div>
                  <Select
                    options={State?.getStatesOfCountry(
                      selectedCountry?.isoCode
                    )} // if the country is selceted then the options of state will render in its positions otherwise the value of state will be undefined
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    getOptionValue={(options) => {
                      return options["name"];
                    }}
                    value={selectedState}
                    onChange={(item) => {
                      setSelectedState(item);
                    }}
                    className="address-select"
                    placeholder="State"
                  />
                  <Select
                    options={City.getCitiesOfState(
                      selectedState?.countryCode,
                      selectedState?.isoCode
                    )}
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    getOptionValue={(options) => {
                      return options["name"];
                    }}
                    value={selectedCity}
                    onChange={(item) => {
                      setSelectedCity(item);
                    }}
                    className="address-select"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={handleSubmit} className="button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckOutPage;
