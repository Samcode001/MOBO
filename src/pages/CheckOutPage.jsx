import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import "../styles/CheckOut.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import cartState from "../recoil/atoms/cart";
import Navbar from "../components/Navbar";
import useAddToCart from "../hooks/addToCart";

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
  const [userAddress, setUserAddress] = useState("");
//   const { cart } = useAddToCart();
const cart=useRecoilValue(cartState)

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
      let tempAddress = address[0];
      const foramtAddress = `
      ${tempAddress.address} ,
      ${tempAddress.City},
      ${tempAddress.State},
      ${tempAddress.Country} (
      ${tempAddress.Pincode});
      `;
      setUserAddress(foramtAddress);
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

  useEffect(() => {
    getAddress();
    console.log(cart);
  }, []);

  return (
    <div>
      {addressFlag ? (
        <>
          {/* <Navbar/> */}
          <div className="checkout-container">
            <div className="checkout-left">
              <div>
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter Mobile no. or Email"
                />
              </div>
              <div className="checkout-address">
                <h2>Address</h2>
                <div>{userAddress}</div>
              </div>
              <div className="checkout-payment-options">
                <h2>Payments Options</h2>
                <div>
                  <h2>Razorpay</h2>
                  <h2>Stripe</h2>
                  <h2>Cash On Delivery</h2>
                </div>
              </div>
              <button>Order Now</button>
            </div>
            <div className="checkout-right">
              <div>
                {/* {console.log(cart)} */}
                <div>
                  {cart &&
                    cart.map((elem) => {
                    return ( <>
                        <div key={elem._id}>
                          <img src={elem.img} alt="" />
                          <div>
                            <h3>{elem.name}</h3>
                            <span>
                              {elem.type}/{elem.memory}/{elem.os}
                            </span>
                          </div>
                          <h2>${elem.price}</h2>
                        </div>
                      </>);
                    })}
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
