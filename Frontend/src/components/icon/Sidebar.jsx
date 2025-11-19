// Sidebar.jsx
import React, { useState } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import UserList from "../layout/Userlist";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../../Redux/userSlice";

import GroupModal from "./Group";

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { otherUsers } = useSelector((store) => store.user);
  const { authUser } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const findUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (findUser) {
      dispatch(setOtherUsers([findUser]));
    } else {
      toast.error('Not Found');
    }
    setSearch('');
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`);
      toast.success(res.data.message);
      navigate('/login');
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  }

  return (
    <div className="flex flex-col h-full w-[30%] p-4 bg-white/10 backdrop-blur-lg border-r border-white/10 text-white">
      
      {/* Search Bar with tiny create group button */}
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={onSubmitHandler} className="flex items-center gap-2 flex-1 bg-white/10 rounded-xl px-3 py-2 border border-white/20 focus-within:bg-white/20 transition-all duration-300">
          <button type="submit" className="p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md hover:shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-grab">
            <FaSearch className="text-white text-base" />
          </button>
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Tiny Create Group Button near search */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md hover:shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          title="Create Group"
        >
          <FaUsers className="text-white text-sm" />
        </button>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 mb-4">
        <UserList />
      </div>

      {/* Logout Button */}
      <button
        className="w-full py-2 rounded-xl text-white font-semibold border border-white/20 shadow-[0_0_10px_rgba(255,0,255,0.4)] hover:shadow-[0_0_20px_rgba(255,0,255,0.7)] hover:scale-[1.02] transition-all duration-300 font-[Cursive]"
        style={{
          background: "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)", // pink → purple → blue
        }}
        onClick={logoutHandler}
      >
        Logout
      </button>

      {/* Group Modal */}
      <GroupModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Sidebar;
