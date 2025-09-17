import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful 🎉");
        navigate("/");
      }
      else{
        toast.error("Error logging in ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging in ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border border-gray-200 shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center mt-2">
            Don't Have an Account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
