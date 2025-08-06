import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    lat: null,
    lon: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin 
        ? { username: formData.username, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      // Validate register form
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }

      const response = await axios.post(`http://localhost:8000${endpoint}`, payload,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.text();

      if (response.ok) {
        if (isLogin) {
          // Parse the response data and store user data in localStorage
          let userData;
          try {
            userData = JSON.parse(data);
          } catch (error) {
            // If data is just a string, create a user object
            userData = {
              username: formData.username,
              email: "", // You might want to get this from response
              image: "",
              points: 0
            };
          }
          
          localStorage.setItem("user", JSON.stringify(userData));
          alert("Login successful!");
          navigate("/"); // Redirect to home
        } else {
          alert("Registration successful! Please login.");
          setIsLogin(true); // Switch to login form
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: "",
            lat: null,
            lon: null
          });
        }
      } else {
        setError(data || "Something went wrong");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/BgHome.png')" }}
    >
      {/* Navbar */}
      <motion.div
        className="w-full py-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Navbar />
      </motion.div>

      {/* Auth Form */}
      <div className="flex items-center justify-center mt-10">
        <motion.div
          className="w-full max-w-md bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white font-montserrat">
              {isLogin ? "Login" : "Register"}
            </h2>
            <p className="text-white/80 font-raleway mt-2">
              {isLogin ? "Welcome back to Shizen" : "Join the Shizen community"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-raleway mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black font-raleway focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white font-raleway mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black font-raleway focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white font-raleway mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black font-raleway focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-white font-raleway mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-black font-raleway focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

               
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-raleway font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80 font-raleway">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    image: "",
                    lat: null,
                    lon: null
                  });
                }}
                className="text-green-300 hover:text-green-200 font-bold ml-2 transition-colors"
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
