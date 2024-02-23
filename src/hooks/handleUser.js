import { useRecoilState } from "recoil";
import userState from "../recoil/atoms/user";
import axios from "axios";

const useHandleUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const getUser = async () => {
    const { data } = await axios.post(
      "https://mobo-alpha.vercel.app/admin/getUser",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data) {
      setUser(data.user);
      localStorage.setItem("user", data.user.username);
    }
  };

  return { user, getUser };
};

export default useHandleUser;
