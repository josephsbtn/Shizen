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
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    if (!city) return;
    setIsLoading(true);
    getRawData(city)
      .then((result) => {
        setData(result);
        setAqi(result.airPollution.aqi);
        setLabel(result.airPollution.label);
        setDeskripsi(result.airPollution.deskripsi);
        setActivity(result.airPollution.activity);
        setDampak(result.airPollution.dampak);
        const plant = result.plants.map((wit) => {
          return {
            Nama: wit.Nama,
            APTI: wit.APTI,
          };
        });
        setPlantRecomendation(plant);
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
