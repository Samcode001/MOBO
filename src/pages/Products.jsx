import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import "../styles/Products.css";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { dataState } from "../store/data";

const Products = () => {
  const [data, setData] = useRecoilState(dataState);
  const [processors, setProcessors] = useState([]);
  const [memory, setMemory] = useState([]);
  const [os, setOs] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    processors: [],
    memory: [],
    os: [],
  });

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/data/phones");
      if (res.status === 200) {
        setData(res.data.phones);
        // let processordata = res.data.phones.filter(elem);
      } else {
        console.log("Some Erro occ");
      }
    } catch (error) {
      console.log(`Error in component :${error}`);
    }
  };

  const applyFilters = () => {
    // Implement your logic to filter data based on selected filters
    const filteredData = data.filter((item) => {
      //   const priceFilter = selectedFilters.price.length === 0 || selectedFilters.price.includes(item.priceRange);
      const processorFilter =
        selectedFilters.processors.length === 0 ||
        selectedFilters.processors.includes(item.processor);
      const memoryFilter =
        selectedFilters.memory.length === 0 ||
        selectedFilters.memory.includes(item.memory);
      const osFilter =
        selectedFilters.os.length === 0 || selectedFilters.os.includes(item.os);

      return processorFilter && memoryFilter && osFilter;
    });

    // Update data with the filtered data
    setData(filteredData);

    console.log(selectedFilters);
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        // Remove value if already present
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        // Add value if not present
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };

  const setFilters = () => {
    const uniqueProcessors = [...new Set(data.map((item) => item.processor))];
    const uniqueMemory = [...new Set(data.map((item) => item.memory))];
    const uniqueOs = [...new Set(data.map((item) => item.os))];
    setProcessors(uniqueProcessors);
    setMemory(uniqueMemory);
    setOs(uniqueOs);
  };

  useEffect(() => {
    getData();
    setFilters();
  }, []);

  return (
    <>
      <Navbar />
      <h1>BEST DEALS</h1>
      <div className="container">
        <div className="left">
          <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>Filters</h2>

          <br />
          <br />
          <h2>Price</h2>
          <ul>
            <li>
              <input type="checkbox" name="" id="" /> 1000 - 5000
            </li>
            <li>
              {" "}
              <input type="checkbox" name="" id="" /> 5000-10000
            </li>
            <li>
              <input type="checkbox" name="" id="" /> 10000-20000
            </li>
            <li>
              <input type="checkbox" name="" id="" /> 20000 Above.
            </li>
          </ul>

          <br />
          <h2>Processor</h2>
          <ul>
            {processors &&
              processors.map((elem) => {
                return (
                  <li>
                    <input 
                  type="checkbox"
                  id={`processor-${elem}`}
                  checked={selectedFilters.processors.includes(elem)}
                  onChange={() => handleCheckboxChange("processors", elem)}
                     /> {elem}
                  </li>
                );
              })}
          </ul>

          <br />
          <h2>Memory</h2>
          <ul>
            {memory &&
              memory.map((elem) => {
                return (
                  <li>
                    <input
                      type="checkbox"
                      id={`memory-${elem}`}
                      checked={selectedFilters.memory.includes(elem)}
                      onChange={() => handleCheckboxChange("memory", elem)}
                      /> {elem}
                  </li>
                );
              })}
          </ul>

          <br />

          <h2>Operating System</h2>
          <ul>
            {os &&
              os.map((elem) => {
                return (
                  <li>
                    <input 
                    type="checkbox"
                    id={`os-${elem}`}
                    checked={selectedFilters.os.includes(elem)}
                    onChange={() => handleCheckboxChange("os", elem)}
                      /> {elem}
                  </li>
                );
              })}
          </ul>

          <br />
          <button className="button" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
        <div className="right">
          {/* {console.log(data)} */}
          {data &&
            data.map((elem) => <ProductsCard key={elem.id} data={elem} />)}
        </div>
      </div>
    </>
  );
};

export default Products;
