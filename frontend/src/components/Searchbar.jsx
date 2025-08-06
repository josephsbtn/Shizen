import React from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const SearchBar = ({ onSearch }) => {
  // local stores
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  //input handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }

    // rederict ke /map dengan query di searchbar mate
    navigate(`/map?city=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <div className="w-full max-w-lg border border-white rounded-xl">
      <div className="w-[97%] m-2 bg-white mx-auto rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cari kota..."
            value={searchValue}
            onChange={handleInputChange}
            className="w-full text-2xl font-bold p-4 rounded-xl text-slate-800 text-center"></input>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
