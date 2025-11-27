import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AI() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  async function handleReview() {
    setLoading(true);
    setResponse("🔍 Analyzing your code...");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai`, {
        prompt: code,
      });
      const data = res.data;
      setResponse(data.result || JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex bg-[#0B0A12] text-[#D8D0FF]">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col border-r border-[#2a2338]">

        <div className="p-5 border-b border-[#2a2338] bg-[#161221]">
          <h1 className="text-2xl font-bold tracking-wide text-[#C9B7FF]">Orion AI</h1>
          <p className="text-sm mt-1 opacity-80 font-[sans-serif] text-[#AFA2DB]">
            🚀 Your intelligent code-review companion — improving quality, performance & clarity
          </p>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="flex-1 p-4 bg-[#110E19] text-[#E9E5FF] text-sm font-mono outline-none resize-none"
        />

        <button
          onClick={handleReview}
          disabled={loading}
          className="m-4 py-3 rounded-lg bg-[#5A2D93] hover:bg-[#7b46d6] transition-all shadow-lg shadow-[#5A2D93]/40 font-semibold"
        >
          {loading ? "Analyzing..." : "Activate Orion 🤖"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex flex-col">

        <div className="flex justify-between items-center p-4 border-b border-[#2a2338] bg-[#161221]">
          <h2 className="text-lg font-semibold tracking-wide text-[#C6B5FF]">Query Result</h2>

          {/* CHAT BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm bg-[#2d243f] hover:bg-[#3b3052] rounded-md transition shadow-md shadow-[#2d243f]/40"
          >
            💬 Chat
          </button>
        </div>

        <pre className="flex-1 p-4 whitespace-pre-wrap overflow-auto bg-[#110E19] text-lg font-[sans-serif]">
          {response || (
            <span className="neon-text-green">Hii {authUser?.userName}! 👋</span>
          )}

          <style>
            {`
              .neon-text-green {
                color: #7CFF8D;
                font-weight: 700;
                letter-spacing: 1px;
                text-shadow: 
                  0 0 5px #4CFF5C,
                  0 0 10px #4CFF5C,
                  0 0 15px #4CFF5C,
                  0 0 25px #1aff38,
                  0 0 35px #1aff38,
                  0 0 45px #1aff38;
                animation: neonPulse 1.6s infinite alternate ease-in-out;
              }

              @keyframes neonPulse {
                0% { opacity: .85; }
                100% { opacity: 1; }
              }
            `}
          </style>
        </pre>
      </div>
    </div>
  );
}
