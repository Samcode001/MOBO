import { useRecoilState } from "recoil";
import userState from "../recoil/atoms/user";
import axios from "axios";

const useHandleUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const getUser = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/admin/getUser",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data) {
      //   console.log("user got");
      setUser(data.user);
    }
  };

  return { user, getUser };
};

export default useHandleUser;
