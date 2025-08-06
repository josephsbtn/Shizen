import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const Home = () => {
  //store search input Searchbar
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchValue) => {
    setSearchQuery(searchValue);
    console.log("Searching based on query: ", searchValue);
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-center bg-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      id="home"
      style={{ backgroundImage: "url('/BgHome.png')" }}>
      <motion.div
        className="w-full py-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Navbar />
      </motion.div>
      <div className="flex items-center justify-center mt-20 flex-col space-y-4">
        <motion.h1
          className="text-8xl font-bold text-center text-white font-montserrat"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}>
          Seberapa Sehat Udara di Kotamu Hari Ini?
        </motion.h1>

        <motion.p
          className="w-[38%] text-2xl font-raleway text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}>
          Cek kualitas udara lokal di kota Anda dengan{" "}
          <span className="font-bold font-raleway">Shizen</span>
        </motion.p>
      </div>

      <div className="w-full flex justify-center mt-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* test output  */}
      {searchQuery && (
        <motion.div
          className="w-full flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mx-4">
            <p className="text-white font-raleway text-lg">
              Mencari data kualitas udara untuk:{" "}
              <span className="font-bold">{searchQuery}</span>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;
