import { useNavigate } from "react-router-dom";
import React from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gradient-dark overflow-hidden flex flex-col items-center justify-center text-center px-4">
      
      {/* Floating symbols/codes */}
      <div className="absolute inset-0">
        {["∞", "Σ", "π", "☯", "⚛", "∑", "λ", "ƒ", "{ }", "<>", "Ψ", "Ω", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "ς", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"].map((char, idx) => (
          <span
            key={idx}
            className={`symbol animate-float delay-${idx * 200}`}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Optional subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/assets/bg-pattern.png" // optional
          alt="background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="z-10 max-w-2xl p-4 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
          CHIT-CHAT
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
          Dive into conversations that spark creativity, celebrate knowledge, and
          connect hearts. Share, chat, and collaborate in a universe of ideas.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/register")}
            className="btn-glasse px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn-glass-outline px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
