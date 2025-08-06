import React, { useEffect, useState } from "react";
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
import plant from "../assets/wit.svg";

const Map = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Salatiga";
  const [data, setData] = useState({});

  const [aqi, setAqi] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [label, setLabel] = useState();
  const [activity, setActivity] = useState();
  const [dampak, setDampak] = useState();
  const [plantRecomendation, setPlantRecomendation] = useState();

  const getRawData = async (city) => {
    try {
      setData("");
      setAqi("");
      setLabel("");
      setDeskripsi("");
      setActivity("");
      setDampak("");
      setPlantRecomendation("");
      const response = (
        await axios.get(`http://localhost:8000/predict/request/${city}`)
      ).data;
      return response.mainCity;
    } catch (error) {
      console.error("Error fetching current data:", error);
      return null;
    }
  };

  useEffect(() => {
    getRawData(city)
      .then((result) => {
        setData(result);
        setAqi(result.airPollution.aqi);
        setLabel(result.airPollution.label);
        setDeskripsi(result.airPollution.deskripsi);
        setActivity(result.airPollution.activity);
        setDampak(result.airPollution.dampak);
        setPlantRecomendation(result.plant);
      })
      .catch((err) => {
        console.log("Something wrong");
      });
  }, []);

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
        <div className="w-1/3 h-auto items-center bg-white text-black rounded-2xl p-4">
          <h2 className="text-main text-2xl font-montserrat font-bold text-center text-[#204E51]">
            Air Quality
          </h2>

          {/* AQI */}
          <div
            className={`w-full h-12 flex-auto rounded-2xl p-2 mx-auto text-center mt-4 ${
              aqi < 75
                ? "bg-[#50CE55]"
                : aqi < 150
                ? "bg-[#e69d3e]"
                : aqi < 300
                ? "bg-[#8d0000]"
                : "bg-[#540054]"
            }`}>
            <span className="text-white text-2xl font-normal font-montserrat leading-normal">
              AQI:
            </span>
            <span className="text-white text-2xl font-bold font-montserrat leading-normal">
              {aqi}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-center font-medium font-montserrat leading-normal pt-2">
            Tergolong <span className="text-sm font-bold fon">{label}</span>
          </p>
          <p className="text-start text-xs font-medium font-montserrat leading-[18px] pt-2">
            {deskripsi}
          </p>

          {/* Activity Recommendation */}
          <div className="h-11 bg-[#3F8DA8] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Recommendation Activity
            </span>
            <img src={run} alt="" />
          </div>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            {activity}
          </p>

          {/* resiko kesehatan */}
          <div className="h-11 bg-[#204E51] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Resiko Kesehatan
            </span>
            <img src={health} alt="" />
          </div>
          <p className="text-xs text-start font-medium font-montserrat leading-normal pt-2">
            {dampak}
          </p>

          {/* rekomendasi tanaman */}
          {/* resiko kesehatan */}
          <div className="h-11 bg-[#50CE55] flex justify-between items-center text-white rounded-2xl p-2 mt-4">
            <span className="text-sm font-medium font-montserrat leading-normal">
              Rekomendasi Tanaman
            </span>
            <img src={plant} alt="" />
          </div>
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
