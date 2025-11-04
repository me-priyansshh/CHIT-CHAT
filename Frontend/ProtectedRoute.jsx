import {  Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const ProtectedRoute = ({ children }) => {
  
    const {authUser} = useSelector((store) => store.user);

    if (!authUser) {
        toast.error('Please login to access this page');
        return <Navigate to="/login" replace />;
    };

  return children;
};

export default ProtectedRoute;