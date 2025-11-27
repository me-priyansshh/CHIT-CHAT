import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setgroups } from "../Redux/groupsSlice";

const useGetGroups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/group/get-Groups`,
          {
            withCredentials: true,
          }
        );

        dispatch(setgroups(res.data.groups));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [dispatch]);
};

export default useGetGroups;
