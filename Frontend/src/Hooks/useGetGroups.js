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
                const res = await axios.get(`http://localhost:8000/api/group/get-Groups`)
                dispatch(setgroups(res.data.groups));
            } catch (error) {
                console.log(error);
            }
         }
         fetchUsers();
     },[]);

}

export default useGetGroups;
