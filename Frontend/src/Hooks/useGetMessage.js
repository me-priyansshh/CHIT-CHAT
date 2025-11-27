import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../Redux/messageSlice";


const useGetMessage = () => {

  const { selectedUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/get/${selectedUser._id}`,{
          withCredentials: true,
        });
        console.log("Fetched messages:", res.data);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id]); // run every time user changes
};

export default useGetMessage;
