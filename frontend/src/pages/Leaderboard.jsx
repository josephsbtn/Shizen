import React from "react";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import crown from "../assets/crown.svg";
import Juarabawah from "../components/leaderboard410";
import tes from "../assets/tolol.png";

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
          {/* juara 2 */}
          <div className="flex-col justify-center items-center">
            <div className="w-44 h-44 rounded-full translate-y-16 bg-black border-8 border-[#204E51]"></div>
            <div className="w-10 h-10 mx-auto translate-y-10 rounded-full bg-[#204E51]">
              <h2 className="font-bold text-white text-center text-3xl font-raleway">
                2
              </h2>
            </div>

            <div className="mx-auto translate-y-11 rounded-full">
                <h2 className="font-bold text-black text-center text-2xl font-raleway">
                  Nolan
                </h2>
                <p className="text-center font-raleway font-light text-xl">100 Point</p>
              </div>
          </div>

          {/* Juara 1 */}
          <div className="flex-col justify-center items-center mx-20 -translate-y-16">
            <img
              src={crown}
              className="w-20 h-20 mx-auto translate-y-8 translate-x-5 rotate-12"
              alt=""
            />
            <div className="w-44 h-44 rounded-full bg-red-500 border-8 border-[#204E51]">
              <img
                className="w-full h-full rounded-full object-cover"
                src={tes}
                alt=""
              />
              <div className="w-10 h-10 mx-auto -translate-y-[20px] rounded-full bg-[#204E51]">
                <h2 className="font-bold text-white text-center text-3xl font-raleway">
                  1
                </h2>
              </div>

              <div className="mx-auto -translate-y-[20px] rounded-full">
                <h2 className="font-bold text-black text-center text-2xl font-raleway">
                  Nolan
                </h2>
                <p className="text-center font-raleway font-light text-xl">100 Point</p>
              </div>
            </div>
          </div>

          {/* juara 2 */}
          <div className="flex-col justify-center items-center">
            <div className="w-44 h-44 rounded-full translate-y-16 bg-black border-8 border-[#204E51]"></div>
            <div className="w-10 h-10 mx-auto translate-y-10 rounded-full bg-[#204E51]">
              <h2 className="font-bold text-white text-center text-3xl font-raleway">
                3
              </h2>
            </div>

            <div className="mx-auto translate-y-11 rounded-full">
                <h2 className="font-bold text-black text-center text-2xl font-raleway">
                  Nolan
                </h2>
                <p className="text-center font-raleway font-light text-xl">100 Point</p>
              </div>
          </div>
        </div>

        {/* Juara 4-5-6-7-8-9-10 */}
        <div className="flex flex-col gap-8 justify-center rounded-2xl bg-[#204E51] w-[90%] mx-auto items-center p-10 my-10">
          <Juarabawah />
          <Juarabawah />
          <Juarabawah />
          <Juarabawah />
          <Juarabawah />
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
