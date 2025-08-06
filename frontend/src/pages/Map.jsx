import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MiniSearchBar from "../components/MiniSearchBar";
import MapBox from "../components/MapBox";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// icons
import wind from "../assets/wind-fill.svg";
import run from "../assets/mdi_run.svg";
import health from "../assets/map_health.svg";

const Map = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Salatiga"; // default to

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
        <div className="w-1/3 h-auto items-center bg-white text-black rounded-2xl p-4">
          <h2 className="text-main text-2xl font-montserrat font-bold text-center text-[#204E51]">
            Air Quality
          </h2>

          {/* AQI */}
          <div className="w-full h-12 flex-auto rounded-2xl p-2 mx-auto text-center mt-4 bg-[#e69d3e]">
            <span className="text-white text-2xl font-normal font-montserrat leading-normal">
              AQI:
            </span>
            <span className="text-white text-2xl font-bold font-montserrat leading-normal">
              75
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-center font-medium font-montserrat leading-normal pt-2">
            Tergolong <span className="text-sm font-bold fon">Sedang</span>
          </p>
          <p className="text-start text-xs font-medium font-montserrat leading-[18px] pt-2">
            Umumnya tidak berbahaya bagi masyarakat umum, namun kelompok
            sensitif seperti anak-anak, lansia, atau penderita penyakit
            pernapasan sebaiknya membatasi aktivitas berat di luar ruangan.
          </p>

          {/* Activity Recommendation */}
          <div className="h-11 bg-[#3F8DA8] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Recommendation Activity
            </span>
            <img src={run} alt="" />
          </div>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            ini gimana jo kan sesuai tempat ya rekomendasi aktivitasnya
          </p>

          {/* resiko kesehatan */}
          <div className="h-11 bg-[#204E51] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Resiko Kesehatan
            </span>
            <img src={health} alt="" />
          </div>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            Umum: <span>Manut daerah</span>
          </p>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            Rentan: <span>Manut daerah</span>
          </p>

          {/* rekomendasi tanaman */}
          {/* resiko kesehatan */}
          <div className="h-11 bg-[#50CE55] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Resiko Kesehatan
            </span>
            <img src={health} alt="" />
          </div>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            Umum: <span>Manut daerah</span>
          </p>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            Rentan: <span>Manut daerah</span>
          </p>
        </div>

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
