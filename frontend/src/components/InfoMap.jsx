import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// icons
import wind from "../assets/wind-fill.svg";
import run from "../assets/mdi_run.svg";
import health from "../assets/map_health.svg";
import plant from "../assets/wit.svg";

const InfoMap = () => {
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
        console.log(result.plants);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Something wrong");
      });
  }, []);
  // Tampilkan loading spinner saat fetch
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="w-1/3 h-auto items-center bg-white text-black rounded-2xl p-4">
      <h2 className="text-main text-2xl font-montserrat font-bold text-center text-[#204E51]">
        Air Quality
      </h2>

      {/* AQI */}
      <div
        className={`w-full h-12 flex-auto rounded-2xl p-2 mx-auto text-center mt-4 ${
          label === "Good"
            ? "bg-[#50CE55]"
            : label === "Moderate"
            ? "bg-[#e69d3e]"
            : label === "Poor"
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

      <div>
        <h1></h1>
        {/* {plantRecomendation.map((wit) => {
                      <div className="flex justify-between p-2">
                        <h1 className="font-raleway font-bold text-xl">{wit.nama}</h1>
                        <h1 className="font-raleway font-medium text-base">
                          {wit.APTI}
                        </h1>
                      </div>;
                    })} */}
      </div>
    </div>
  );
};
export default InfoMap;
