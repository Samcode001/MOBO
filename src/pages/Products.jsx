import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard.jsx";

const Products = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/data/phones");
      if (res.status === 200) {
        setData(res.data.phones);
      } else {
        console.log("Some Erro occ");
      }
    } catch (error) {
      console.log(`Error in component :${error}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
        {/* {console.log(data)} */}
      {data && data.map((elem) => <ProductsCard key={elem.id} data={elem} />)}
    </div>
  );
};

export default Products;
