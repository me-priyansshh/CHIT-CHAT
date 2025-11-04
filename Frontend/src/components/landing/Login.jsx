import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../Redux/userSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ Send credentials so cookies can be stored
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        credentials,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      dispatch(setAuthUser(res.data.user));
      navigate("/screen");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }

    setCredentials({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="relative w-full h-screen bg-gradient-dark overflow-hidden flex items-center justify-center px-4">
      {/* Floating symbols */}
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

      {/* Glassy Form */}
      <form
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-glow animate-slide-in"
      >
        <h2 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Login to continue chatting with friends and explore the universe of ideas.
        </p>

        <input
          type="text"
          placeholder="Username"
          className="input-glass w-full mb-4"
          value={credentials.userName}
          onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-glass w-full mb-6"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />

        <button type="submit" className="btn-glass mx-auto block py-3 text-lg font-bold mt-4">
          Login
        </button>

        <p className="text-gray-300 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
