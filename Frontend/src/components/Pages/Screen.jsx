// Screen.jsx
import React from "react";
import Sidebar from "../icon/Sidebar";
import Box from "../icon/Box";

const Screen = () => {
  return (
    <div className="flex h-screen w-full bg-[#0f0f0f] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Box Area */}
      <div className="flex-1 max-w-[70%] p-6 bg-white/5 backdrop-blur-lg border-l border-white/10">
        <Box />
      </div>
    </div>
  );
};

export default Screen;
