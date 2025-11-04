import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../Redux/messageSlice";


const useGetRealTimeMessage = () => {

     const {socket} = useSelector(store => store.socket);
     const {messages} = useSelector(store => store.message);
     const dispatch = useDispatch();

    useEffect(() => {
         socket?.on('newMessage', (newMessage) => {
             dispatch(setMessages([...messages, newMessage]));
         })
    },[socket, messages, dispatch, setMessages])
}

export default useGetRealTimeMessage;