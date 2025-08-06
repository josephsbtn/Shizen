import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MiniSearchBar from "../components/MiniSearchBar";
import MapBox from "../components/MapBox";
import InfoMap from "../components/InfoMap";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// icons
import wind from "../assets/wind-fill.svg";
import run from "../assets/mdi_run.svg";
import health from "../assets/map_health.svg";
import plant from "../assets/wit.svg";

const Map = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Salatiga";

  // default to

  return (
    <div className="w-full h-full bg-[#204E51] min-h-screen">
      {/* Animated Navbar */}
      <motion.div
        className="w-full py-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Navbar />
      </motion.div>

      {/* Top Section: Title and Search */}
      <div className="flex justify-between items-center px-20 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Penyebaran Polusi</h1>
          <img src={wind} alt="Wind Icon" className="w-8 h-8" />
        </div>

        <div className="max-w-md">
          <MiniSearchBar />
        </div>
      </div>

      {/* Map Info */}
      <div className="w-full flex justify-between items-center px-20 pt-2 gap-4">
        {/* Map desc */}

        <InfoMap />

        {/* Map Section */}
        <div className="w-4/5 h-[500px] border-white border-2 rounded-3xl shadow-lg">
          <div className="w-full h-full">
            <MapBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
