import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import Message from "../layout/Messages";
import useGetMessage from "../../Hooks/useGetMessage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMessages } from "../../Redux/messageSlice";
import { setSelectedUser } from "../../Redux/userSlice";
import useGetRealTimeMessage from "../../Hooks/useRealTimeMessage";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";

const Box = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const { onlineUsers } = useSelector((store) => store.user);
  const { groups } = useSelector((store) => store.groups);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const sendRef = useRef(null);
  const messagesEndRef = useRef(null);

  useGetMessage();
  useGetRealTimeMessage();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:8000/api/message/send/${selectedUser?._id}`,
        { message: input }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setInput("");
      sendRef.current?.focus();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleMemberClick = async (member) => {
  try {
    if (selectedMembers.includes(member.userName)) {
      // Unselect → remove from group
      setSelectedMembers(selectedMembers.filter((u) => u !== member.userName));

      const res = await axios.post(
        `http://localhost:8000/api/group/remove`,
        {
          groupId: selectedUser._id,
          memberId: selectedUser?.members?._id, // use _id from backend
        },
        { withCredentials: true }
      );

      // Update selectedUser members with response from backend
      dispatch(setSelectedUser(res.data.updatedGroup));

      toast.success(res.data.message);
    } else {
      // Select → add to group
      setSelectedMembers([...selectedMembers, member.userName]);

      const res = await axios.post(
        `http://localhost:8000/api/group/add`,
        {
          groupId: selectedUser._id,
          memberId: member._id,
        },
        { withCredentials: true }
      );

      // Update selectedUser members with response from backend
      dispatch(setSelectedUser(res.data.updatedGroup));

      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

  const isOnline = onlineUsers?.includes(selectedUser?._id);

    console.log("Selected User:", selectedUser);

  const outerStyle = {
    background:
      "linear-gradient(135deg, rgba(255,0,119,0.12), rgba(63,94,251,0.08), rgba(0,255,234,0.06))",
    boxShadow:
      "0 8px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
    borderRadius: "1rem",
  };

  const rgbRingStyle = {
    position: "absolute",
    inset: "-2px",
    borderRadius: "1rem",
    padding: "2px",
    background:
      "linear-gradient(90deg, rgba(255,0,119,0.6), rgba(63,94,251,0.6), rgba(0,255,234,0.6), rgba(255,159,67,0.6))",
    backgroundSize: "300% 300%",
    zIndex: 0,
    filter: "blur(14px)",
    opacity: 0.9,
    animation: "rgbShift 5s linear infinite, rgbFlicker 3.2s ease-in-out infinite",
    pointerEvents: "none",
  };

  const headerStyle = {
    background:
      "linear-gradient(90deg, rgba(10,10,20,0.75) 0%, rgba(25,25,35,0.65) 100%)",
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 4px 30px rgba(0,255,255,0.1)",
  };

  const inputStyle = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.02), 0 0 20px rgba(0,255,255,0.1)",
  };

  const sendBtnStyle = {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 6px 18px rgba(63,94,251,0.12)",
    backdropFilter: "blur(8px)",
  };

  if (!selectedUser) {
    return (
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-2xl">
        <div style={rgbRingStyle} />
        <div
          style={{
            ...outerStyle,
            zIndex: 10,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="relative p-8"
        >
          <div
            className="relative z-20 w-full max-w-3xl mx-auto rounded-2xl p-12 text-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px) saturate(150%)",
              WebkitBackdropFilter: "blur(10px) saturate(150%)",
              boxShadow: "0 30px 80px rgba(2,6,23,0.6)",
            }}
          >
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Welcome to Cosmic Chat
            </h1>
            <p className="text-gray-200 mb-8">
              Select a contact to start a conversation — your messages will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full w-full rounded-2xl overflow-hidden" style={outerStyle}>
      <div style={rgbRingStyle} />
      <div className="relative z-10 h-full flex flex-col" style={{ minHeight: 0 }}>
       {/* Header */}
<div className="flex items-center justify-between px-6 py-3" style={headerStyle}>
  {/* Left: Avatar + Name */}
  <div className="flex items-center gap-3">
    {/* Avatar */}
    <img
      src={
        selectedUser?.isGroup
          ? "https://avatar.iran.liara.run/public/job/operator/male.png"
          : selectedUser?.profilePic
      }
      alt="avatar"
      className="w-12 h-12 rounded-full object-cover ring-1 ring-white/5"
    />

    {/* Name and info */}
    <div>
      {/* Group or User Name */}
      <h2
        className="font-semibold text-lg leading-tight"
        style={{
          background:
            "linear-gradient(90deg, #00ffff, #3f5efb, #ff0077, #ff9f43, #00ffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "300% 100%",
          animation: "rgbLight 5s linear infinite",
        }}
      >
        {selectedUser?.isGroup ? selectedUser?.name : selectedUser?.userName}
      </h2>

      {/* Group members or Online status */}
      {selectedUser?.isGroup ? (
        <div className="font-[cursive] text-sm mt-1 text-gray-400">
          {selectedUser.members.map((member) => member.userName).join(" | ")}
        </div>
      ) : (
        <div className="flex font-[cursive] items-center gap-2 text-sm mt-1">
          <IoMdRadioButtonOn
            className={isOnline ? "text-green-400" : "text-gray-500"}
          />
          <span className={isOnline ? "text-green-400" : "text-gray-400"}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      )}
    </div>
  </div>

  {/* Right: Delete member icon */}
  {selectedUser?.isGroup && (
    <div className="relative">
      <IoMdTrash
        className="text-red-400 w-6 h-6 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
          {selectedUser.members.map((member) => (
            <div
              key={member.userName}
              onClick={() => handleMemberClick(member)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                selectedMembers.includes(member.userName)
                  ? "bg-gray-700 text-cyan-400 font-semibold"
                  : "text-gray-300"
              }`}
            >
              {member.userName}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>


        {/* Messages area (hidden scrollbar) */}
        <div
          className="flex-1 px-4 py-3"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {messages?.length > 0 ? (
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))
          ) : (
            <div className="flex flex-col items-center font-[cursive] justify-center h-full text-center text-gray-400 select-none">
              <h2 className="text-xl font-[cursive] text-cyan-300 mb-2">No Messages Yet</h2>
              <p>
                Start chatting with{" "}
                <span className="text-cyan-400">
                  {selectedUser?.fullName || "someone special"}
                </span>{" "}
                💬
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar (mirror glass) */}
        <form
          onSubmit={onSubmitHandler}
          className="px-6 py-4 flex items-center gap-3 border-t border-white/5"
          style={{
            background:
              "linear-gradient(90deg, rgba(25,25,35,0.75), rgba(15,15,25,0.6))",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
          }}
        >
          <input
            ref={sendRef}
            type="text"
            placeholder={`Message ${selectedUser?.userName || "them"}...`}
            className="flex-1 rounded-full px-4 py-3 text-white placeholder-gray-300 outline-none"
            style={inputStyle}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={sendBtnStyle}
          >
            <FaPaperPlane className="text-white/95" />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes rgbShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rgbLight {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rgbFlicker {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Box;
