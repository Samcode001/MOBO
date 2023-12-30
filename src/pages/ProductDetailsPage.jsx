import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { allPhonesDataState } from "../store/data";
import Navbar from "../components/Navbar";
import ProductDetails from '../components/ProductDetails.jsx'
import Footer from "../components/Footer.jsx";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const allPhones = useRecoilValue(allPhonesDataState);

  const phone_data = allPhones.find((elem) => elem._id === id);

  useEffect(() => {
    console.log(phone_data);
  }, []);

  return (
    <div>
      <Navbar />
     <ProductDetails data={phone_data}/>
     <Footer/>
    </div>
  );
};

export default ProductDetailsPage;
