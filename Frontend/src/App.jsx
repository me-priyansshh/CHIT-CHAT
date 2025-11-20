import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import "./App.css";
import Screen from "./components/Pages/Screen";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import io from "socket.io-client";
import { setSocket } from "./Redux/socketSlice";
import { setOnlineUsers, setSelectedUser } from "./Redux/userSlice";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, [dispatch]);

 useEffect(() => {
  if (!authUser) return;

  const socket = io(import.meta.env.VITE_API_URL, {
    query: { userId: authUser._id },
  });

  dispatch(setSocket(socket));

  // Online users
  socket.on("getOnlineUsers", (onlineUsers) => {
    dispatch(setOnlineUsers(onlineUsers));
  });

  // Join all user groups (extract IDs)
  if (authUser.groups && authUser.groups.length > 0) {
    const groupIds = authUser.groups.map((g) => g._id);
    socket.emit("joinUserGroups", groupIds);
  }

  // RECEIVE GROUP MESSAGES
  socket.on("receiveGroupMessage", (data) => {
    dispatch(addGroupMessage(data)); // <-- You must create this reducer
  });

  return () => {
    socket.disconnect();
    dispatch(setSocket(null));
  };
}, [authUser]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/screen"
            element={
              <ProtectedRoute>
                <Screen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
