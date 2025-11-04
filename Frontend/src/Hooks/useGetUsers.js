import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../Redux/userSlice';


const useGetUsers = () => {

      const dispatch = useDispatch();


     useEffect(() => {
         const fetchUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/user/getAll`)
                dispatch(setOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.log(error);
            }
         }
         fetchUsers();
     },[]);

}

export default useGetUsers;
