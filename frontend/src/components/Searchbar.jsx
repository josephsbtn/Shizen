import React from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }

    navigate(`map?city=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl h-12 mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Cari Kota..."
          className="w-full h-12 rounded-3xl px-4 text-2xl text-center font-medium text-black"
          type="text"
        />
      </form>
    </div>
  );
};
export default Searchbar;
