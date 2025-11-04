import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import UserItem from "./Useritem";
import useGetUsers from "../../Hooks/useGetUsers";
import useGetGroups from "../../Hooks/useGetGroups";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../Redux/userSlice";
import { setgroups } from "../../Redux/groupsSlice";
import { setMessages } from "../../Redux/messageSlice";
import toast from "react-hot-toast";
import axios from "axios";

const UserList = () => {
  useGetUsers();
  useGetGroups();

  const dispatch = useDispatch();
  const { otherUsers, onlineUsers } = useSelector((store) => store.user);
  const { groups } = useSelector((store) => store.groups);

  if (!otherUsers) return <div className="text-white">Loading users...</div>;

  const sortedUsers = [...otherUsers].sort((a, b) => {
    const aOnline = onlineUsers?.includes(a._id);
    const bOnline = onlineUsers?.includes(b._id);
    return aOnline === bOnline ? 0 : aOnline ? -1 : 1;
  });

  const handleSelectGroup = (group) => {
    dispatch(setMessages([]));
    dispatch(setSelectedUser({ ...group, isGroup: true }));
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const res = await axios.delete("http://localhost:8000/api/group/delete", {
        data: { groupId },
        withCredentials: true,
      });

      toast.success(res.data.message);
      
      if (res.data.group) {
        // remove deleted group from redux
        const updatedGroups = groups.filter((g) => g._id !== groupId);
        dispatch(setgroups(updatedGroups));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Groups on top */}
      {groups?.map((group) => (
        <div key={group._id} className="relative">
          <div
            onClick={() => handleSelectGroup(group)}
            className="flex items-center justify-between gap-3 p-2 rounded-xl font-[cursive] transition-all duration-300 cursor-pointer
                       bg-black-900 hover:bg-green-500"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img
                  src={group.groupAdmin?.profilePic || "/default-group.png"}
                  alt="group-avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-purple-400 font-semibold text-sm md:text-base">
                  {group.name}
                </div>
                <div className="text-yellow-100 text-xs md:text-sm">
                  Admin: {group.groupAdmin?.fullName}
                </div>
                <div className="text-green-200 text-xs md:text-sm flex flex-wrap gap-1">
                  Members: {group.members?.map((m) => m.userName).join(", ")}
                </div>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents selecting group
                handleDeleteGroup(group._id);
              }}
              className="p-2 rounded-sm hover:bg-red-600 transition text-white text-lg md:text-sm"
              title="Delete Group"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[0.5px] bg-white/10 mt-1 rounded"></div>
        </div>
      ))}

      {/* Users */}
      {sortedUsers.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
