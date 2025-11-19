import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../Redux/userSlice';

const useGetUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Always send cookies (token)
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/getAll`,
          {
            withCredentials: true,
          }
        );

        dispatch(setOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [dispatch]);
};

export default useGetUsers;
