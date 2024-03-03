import { useRecoilState } from "recoil";
import cartState from "../recoil/atoms/cart";
import axios from "axios";

const useUpdateQuantity = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const updateQuantity = async (quantity, productName, flag) => {
    // flag ? (quantity = quantity + 1) : (quantity = quantity - 1);
    // console.log(quantity, productName, flag);
    const {
      data: { updatedCart },
    } = await axios.post(
      "https://mobo-shzp.vercel.app/cart/updateQuantity",
      {
        updateQuantity: quantity,
        productName: productName,
      user:   sessionStorage.getItem("user")
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (updatedCart) {
      setCart(updatedCart.cart);
    } else console.log("Error in fetching cart");
  };
  return { cart, updateQuantity };
};

export default useUpdateQuantity;
