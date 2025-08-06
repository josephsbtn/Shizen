import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

import chart from "../assets/Leaderbord.svg";
import Top10 from "../components/Top10leaderboard";
import Top3 from "../components/Top3leaderboard";

const Leaderboard = () => {
  return (
    <motion.div
      className="w-full min-h-screen flex flex-col bg-center bg-[#204E51]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      id="home"
    >
      <motion.div
        className="w-full py-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Navbar />
      </motion.div>
      <div className="bg-[#204E51] rounded-b-3xl">
        <div className="flex justify-start items-center px-20 gap-4">
          <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          <img src={chart} alt="" />
        </div>
      </div>
      <div className="flex-grow" />

      {/* Top3 */}
      <div>
        <div className="flex justify-center items-center mt-10">
          <div className="w-[90%] bg-white rounded-3xl shadow-lg p-10">
            <Top3 />
          </div>
        </div>
      </div>

      {/* Top 10 */}
      <div className="flex bg-white rounded-t-3xl justify-center items-end gap-4 mb-10">
        <div className="w-[80%] bg-white rounded-3xl shadow-lg p-10">
          <Top10 />
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
