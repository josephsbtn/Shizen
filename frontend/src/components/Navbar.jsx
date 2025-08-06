import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Shizen from "../assets/Shizen.png";

const Navbar = () => {
  return (
    <nav className="w-[50%] bg-white backdrop-blur-sm flex justify-between items-center mx-auto rounded-full shadow-lg px-10 py-3">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={Shizen} className="w-28 h-auto -translate-y-[5px]" alt="Shizen Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <ul className="flex space-x-8 -translate-x-8 justify-center items-center">
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

      {/* Kosongan */}
      <div className="">
      </div>
    </nav>
  );
};

export default Navbar;
