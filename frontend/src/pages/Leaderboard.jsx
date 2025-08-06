import React from "react";
import Navbar from "../components/Navbar";
import crown from "../assets/crown.svg";
import Juarabawah from "../components/leaderboard410";

const Leaderboard = () => {
  return (
    <div className="w-full flex flex-col bg-[#204E51] bg-cover bg-center">
      <div className="py-2">
        <Navbar />
      </div>
      <h1 className="text-white text-5xl text-center font-bold font-montserrat leading-normal pt-12">
        Leaderboard
      </h1>

{/* LEADERBOARDNYA */}
      <div className="bg-white rounded-t-3xl w-[90%] mx-auto">

        {/* Juara 1 - 2 - 3 */}
        <div className="flex justify-center items-center p-10 gap-2">
          <div className="w-44 h-44 rounded-full translate-y-16 bg-black"></div>

          {/* Juara 1 */}
          <div className="flex-col justify-center items-center mx-20">
          <img 
          src={crown} 
          className="w-20 h-20 mx-auto translate-y-8 translate-x-5 rotate-12"
          alt="" />
          <div className="w-44 h-44 rounded-full bg-red-500"></div>
          </div>

          <div className="w-44 h-44 rounded-full translate-y-16 bg-black"></div>
        </div>


        {/* Juara 4-5-6-7-8-9-10 */}
        <div className="flex justify-center rounded-t-2xl bg-[#204E51] w-[90%] mx-auto items-center p-10 gap-2">
          <Juarabawah />
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
