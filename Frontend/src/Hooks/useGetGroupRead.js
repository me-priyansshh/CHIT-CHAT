import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

const useGetGroupMessages = () => {

  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;
      try {
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/group/getMessage/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setMessages(res.data.messages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id]);
};

export default useGetGroupMessages;
