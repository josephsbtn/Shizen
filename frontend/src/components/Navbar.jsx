import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Shizen from "../assets/Shizen.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check for user authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
    alert("Logged out successfully!");
  };

  // Get profile image with fallback
  const getProfileImage = (image, username) => {
    if (image && image !== '') {
      return image;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username || 'User')}&background=4A6765&color=ffffff&size=100`;
  };

  return (
    <nav className="w-[50%] bg-white backdrop-blur-sm flex justify-between items-center mx-auto rounded-full shadow-lg px-6 py-3">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={Shizen} className="w-28 h-auto -translate-y-[5px]" alt="Shizen Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 justify-center items-center">
        <li>
          <Link to="/" className="text-black font-raleway hover:text-green-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/challenge" className="text-black font-raleway hover:text-green-600 transition-colors">
            Challenge
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="text-black font-raleway hover:text-green-600 transition-colors">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/report" className="text-black font-raleway hover:text-green-600 transition-colors">
            Report
          </Link>
        </li>
      </ul>

      {/* Auth Section */}
      <div className="flex-shrink-0 relative">
        {user ? (
          // Profile Dropdown
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={getProfileImage(user.image, user.username)}
                alt={`${user.username} profile`}
                className="w-10 h-10 rounded-full border-2 border-green-500 object-cover transition-all duration-300 hover:border-green-600 hover:shadow-lg"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=4A6765&color=ffffff&size=100`;
                }}
              />
              <div className="hidden md:block text-left">
                <p className="text-black font-raleway font-medium text-sm">
                  {user.username}
                </p>
                <p className="text-gray-500 font-raleway text-xs">
                  {user.point || 0} points
                </p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={getProfileImage(user.image, user.username)}
                      alt={`${user.username} profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 font-montserrat">
                        {user.username}
                      </p>
                      <p className="text-sm text-gray-500 font-raleway">
                        {user.email}
                      </p>
                      <p className="text-sm text-green-600 font-raleway font-medium">
                        {user.points || 0} points
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-raleway"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Login Button
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-raleway font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
