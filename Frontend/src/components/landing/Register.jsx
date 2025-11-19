import { useNavigate } from "react-router-dom";
import { FaMale, FaFemale } from "react-icons/fa";
import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import toast from "react-hot-toast";


export default function Register() {

  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); // prevent page reload
    
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    //API call here by axios
    try {
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, user);
       toast.success(res.data.message);
       navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setUser({
       fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
    });
  }

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

      {/* Glassy shining form */}
      <form 
        onSubmit={submitHandler} 
        className="relative z-10 w-full max-w-md p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-glow animate-slide-in"
      >
        <h2 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Create Account
        </h2>

        <input 
          type="text" 
          placeholder="Full Name" 
          className="input-glass w-full mb-4"
          value={user.fullName}
          onChange={(e) => setUser({...user, fullName: e.target.value})}
          required
        />
        <input 
          type="text" 
          placeholder="Username" 
          className="input-glass w-full mb-4"
          value={user.userName}
          onChange={(e) => setUser({...user, userName: e.target.value})}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-glass w-full mb-4"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          required
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="input-glass w-full mb-6"
          value={user.confirmPassword}
          onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
          required
        />

        {/* Gender selection */}
        <div className="flex justify-center space-x-8 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer text-white">
            <input 
              type="radio" 
              name="gender" 
              className="accent-cyan-400"
              value="male"
              onChange={(e) => setUser({...user, gender: e.target.value})}
              required
            />
            <FaMale className="text-cyan-400"/>
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer text-white">
            <input 
              type="radio" 
              name="gender" 
              className="accent-pink-400"
              value="female"
              onChange={(e) => setUser({...user, gender: e.target.value})}
              required
            />
            <FaFemale className="text-pink-400"/>
            <span>Female</span>
          </label>
        </div>

        {/* Sign Up button */}
        <button 
          type="submit" 
          className="btn-glasss mx-auto block py-3 text-lg font-bold mt-4"
        >
          Sign Up
        </button>

        {/* Already user link */}
        <p className="text-gray-300 text-center mt-4 text-sm">
          Already a user?{" "}
          <span 
            className="text-cyan-400 cursor-pointer hover:underline" 
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
