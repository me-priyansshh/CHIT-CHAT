import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

const useGetGroupRealTimeMessage = (groupId) => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);

  useEffect(() => {
    if (!socket || !groupId) return;

    const handler = (data) => {
      // Only update messages if the selected group is same
      if (data.groupId === groupId) {
        dispatch(setMessages([...messages, data.newMessage]));
      }
    };

    socket.on("receiveGroupMessage", handler);
    
  }, [socket, groupId]);
};

export default useGetGroupRealTimeMessage;
