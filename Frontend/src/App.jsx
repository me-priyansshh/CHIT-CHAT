import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/landing/Login';
import Register from './components/landing/Register';
import './App.css';
import Screen from './components/Pages/Screen';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from './Redux/socketSlice';
import { setOnlineUsers, setSelectedUser } from './Redux/userSlice';
import ProtectedRoute from '../ProtectedRoute';



function App() {

    const {authUser} = useSelector(store => store.user);
    const {socket} = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setSelectedUser(null));
    },[dispatch]);
    
    useEffect(() => {
       if(authUser) {
         const socket = io('http://localhost:8000', {
             query: {
               userId: authUser._id,
             }
         });
         dispatch(setSocket(socket));

         socket.on('getOnlineUsers', (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers));
         });

         return () => {
          if(socket) {
            socket.close();
            dispatch(setSocket(null));
          }
         }
       }
    },[authUser]);

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/screen' element={<ProtectedRoute><Screen /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
