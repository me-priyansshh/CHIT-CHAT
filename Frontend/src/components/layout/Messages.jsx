import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ message }) => {
  const scroll = useRef();
  const { selectedUser } = useSelector((store) => store.user);
  const { authUser} = useSelector((store) => store.user);

  const isSender = message.senderId !== selectedUser?._id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const glassyBubble = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)",
    textShadow: "0 0 6px rgba(255,255,255,0.6)",
    transition: "0.3s ease-in-out",
  };

  const glowText = {
    color: "#fff",
    textShadow: "0 0 6px rgba(0, 255, 255, 0.7), 0 0 10px rgba(0, 128, 255, 0.6)",
  };

  return (
    <div
      ref={scroll}
      className={`flex items-end gap-2 px-4 mb-3 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {/* Incoming message avatar */}
      {!isSender && (
        <img
          src={selectedUser?.profilePic}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border border-gray-600 shadow-md"
        />
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[70%] font-[cursive] px-4 py-2 rounded-2xl text-sm shadow-lg ${
          isSender
            ? "rounded-br-none"
            : "rounded-bl-none"
        }`}
        style={{
          ...glassyBubble,
          background: isSender
            ? "linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(0, 100, 255, 0.1))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(100, 100, 100, 0.1))",
        }}
      >
        <p className="text-[12px] font-bold text-cyan-300 mb-1">
                {isSender ? authUser?.userName : selectedUser?.userName}
          </p>

        <p style={glowText}>{message?.message}</p>
        <span className="text-[10px] font-[cursive] text-gray-400 float-right mt-1">
          {moment(message.createdAt).format("hh:mm A")}
        </span>
      </div>

      {/* Outgoing message avatar */}
      {isSender && (
        <img
          src="https://avatar.iran.liara.run/public/boy?username=you"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border border-cyan-400 shadow-lg"
        />
      )}
    </div>
  );
};

export default Message;
