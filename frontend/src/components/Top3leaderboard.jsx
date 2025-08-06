import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import juara from "../assets/crown 1.svg";
import axios from "axios";

const Top10Leaderboard = () => {
  const [juara1, setJuara1] = useState();
  const [juara2, setJuara2] = useState();
  const [juara3, setJuara3] = useState();

  const fetchTop3 = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/leaderboard/:id");
      const data = response.data;

      juara1(data[0]);
      juara2(data[1]);
      juara3(data[3]);
    } catch (error) {
      console.error("gagal fetch bro", error);
    }
  };

  useEffect(() => {
    fetchTop3();
  }, []);

  return (
    <div className="flex mx-auto justify-between items-center px-40">
      {/* Top2 */}
      <div className="flex-col translate-y-20">
        <motion.div className="w-52 h-52 p-2 px-20 bg-red-950 mx-auto rounded-full flex items-center justify-between">
          {/* num,,crown,pict,name,score */}
          <div className="flex items-center justify-center text-white gap-4">
            <img
              src="https://via.placeholder.com/150"
              className="mb-4 bg-white rounded-full"
              alt="fafa"
            />
          </div>
        </motion.div>
        <div className="flex-col flex items-center justify-center text-black gap-2">
          <p className="text-2xl font-bold">Nolan</p>
          <p className="text-2xl font-bold">1000 Points</p>
        </div>
      </div>

      {/* TOp1 */}
      <div className="flex-col flex">
        <img src={juara} className="w-20 h-20 mx-auto translate-y-6" alt="" />
        <motion.div className="w-52 h-52 p-2 px-20 bg-black mx-auto rounded-full flex items-center justify-between">
          {/* num,,crown,pict,name,score */}
          <div className="flex items-center justify-center text-white gap-4">
            {/* <img
              src=""
              className="mb-4 bg-white rounded-full"
            /> */}
          </div>
        </motion.div>
        <div className="flex-col flex items-center justify-center text-black gap-2">
          <p className="text-2xl font-bold">{juara1.name}</p>
          <p className="text-2xl font-bold">{juara1.point} Points</p>
        </div>
      </div>

      {/* Top3 */}
      <div className="flex-col translate-y-20">
        <motion.div className="w-52 h-52 p-2 px-20 bg-slate-700 mx-auto rounded-full flex items-center justify-between">
          {/* num,,crown,pict,name,score */}
          <div className="flex items-center justify-center text-white gap-4">
            <img
              src="https://via.placeholder.com/150"
              className="mb-4 bg-white rounded-full"
            />
          </div>
        </motion.div>
        <div className="flex-col flex items-center justify-center text-black gap-2">
          <p className="text-2xl font-bold">Nolan</p>
          <p className="text-2xl font-bold">1000 Points</p>
        </div>
      </div>
    </div>
  );
};

export default Top10Leaderboard;
