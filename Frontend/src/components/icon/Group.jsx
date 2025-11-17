import { useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setgroups } from "../../Redux/groupsSlice";
import { useDispatch } from "react-redux";


const GroupModal = ({ isOpen, setIsOpen, onCreateGroup }) => {

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { otherUsers } = useSelector((store) => store.user);
  const { groups } = useSelector((store) => store.groups);

    const dispatch = useDispatch();

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const onSubmitHandler =async (e) => {
     try {
        e.preventDefault();

        if (!groupName || selectedMembers.length === 0) return;

         const res = await axios.post("http://localhost:8000/api/group/create", {
           name: groupName,
           members: selectedMembers,
         });

        toast.success("Group created successfully!");
        const updatedGroups = [...groups, res.data.group];
        dispatch(setgroups(updatedGroups));
        
        setGroupName("");
        setSelectedMembers([]);
        setIsOpen(false);
        console.log(res.data);
     } catch (error) {
        console.log(error);
        toast.error(res.error.data.message);
     }
  };

  /* if (!groupName || selectedMembers.length === 0) return;
    onCreateGroup({ name: groupName, members: selectedMembers });
    setGroupName("");
    setSelectedMembers([]);
    setIsOpen(false); */

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`fixed right-2 top-10 h-[80vh] w-80 md:w-96 p-5 flex flex-col gap-4 rounded-xl border border-violet-400/50 transition-all duration-500 z-50 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #3b006f 0%, #9f00ff 50%, #ff0077 100%)",
        boxShadow:
          "0 0 25px rgba(159,0,255,0.4), inset 0 0 20px rgba(255,0,119,0.2)",
      }}
    >
      {/* Close Button */}
      <button 
        type="button"
        className="self-end text-2xl font-bold hover:text-pink-300 z-20"
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold tracking-wide z-20">Create Group</h2>

      {/* Group name input */}
      <input
        type="text"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="p-2 rounded-md bg-black/30 border border-violet-300/50 focus:ring-2 focus:ring-violet-300 outline-none"
      />

      {/* Scrollable User List with hidden scrollbar */}
      <div
        className="flex-1 overflow-y-auto p-2 bg-black/20 rounded-md border border-violet-300/50"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => toggleMember(user._id)}
            className={`p-2 rounded-md cursor-pointer transition-all ${
              selectedMembers.includes(user._id)
                ? "bg-violet-500/50"
                : "hover:bg-violet-500/20"
            }`}
          >
            {user.fullName || user.userName}
          </div>
        ))}
      </div>

      {/* Create Group final button inside modal */}
      <button
        type="submit"
        className="mt-2 py-3 rounded-md bg-violet-500/60 hover:bg-violet-500/80 font-semibold text-white shadow-lg transition-all"
      >
        Create Group
      </button>

      {/* Hide scrollbar for Webkit */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </form>
  );
};

export default GroupModal;
