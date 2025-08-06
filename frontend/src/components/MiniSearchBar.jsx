import React, { useState } from "react";
import search from "../assets/material-symbols_search.svg";
import { useNavigate } from "react-router-dom";

const MiniSearchBar = ({ onSearch }) => {
  // local stores
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // input handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }

    navigate(`/map?city=${encodeURIComponent(searchValue.trim())}`);
    setSearchValue(""); // Clear input after search
  };

  return (
    <div className="w-full rounded-xl">
      <div className="max-w-lg bg-white mx-auto rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <img 
              src={search} 
              alt="search" 
              className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none z-10" 
            />
            <input
              type="text"
              placeholder="Kota lainnya"
              value={searchValue}
              onChange={handleInputChange}
              className="w-full h-12 pl-12 pr-4 rounded-xl text-black font-raleway"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MiniSearchBar;