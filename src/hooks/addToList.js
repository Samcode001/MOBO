import { useRecoilState } from "recoil";
import wishListState from "../recoil/atoms/wishList";
import axios from "axios";
import { toast } from "react-toastify";

const useHanldeList = () => {
  const [wishList, setWishList] = useRecoilState(wishListState);

  const addToList = async (productData) => {
    const {
      data: { success, message },
    } = await axios.post(
      "http://localhost:3000/wishlist/addItem",
      {
        name: productData.name,
        img: productData.images[0],
        os: productData.os,
        type: productData.type,
        memory: productData.memory,
        price:productData.price
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (success) {
      setWishList((prevCart) => [...prevCart, productData]);
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
    } else {
      toast.error(message, {
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

  const removeToList = async (itemName) => {
    const res = await axios.post(
      "http://localhost:3000/wishlist/removeItem",
      {
        name: itemName,
      },
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 201) {
      toast.error("Item Removed", {
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
    setWishList((prevCart) => prevCart.filter((elem) => elem.name !== itemName));
  };

  return { wishList, addToList, removeToList };
};

export default useHanldeList;
