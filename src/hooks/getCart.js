import { useRecoilState } from "recoil";
import cartState from "../recoil/atoms/cart";
import axios from "axios";

const useGetCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const getCart = async () => {
    const {
      data: { cartItems },
    } = await axios.get("https://mobo-service.onrender.com/cart/getItems", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (cartItems) {
      setCart(cartItems);
    }
  };

  return { cart, getCart };
};

export default useGetCart;
