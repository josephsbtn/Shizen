import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import axios from "axios";

import ChallengeIcon from "../assets/challenge.svg";
import MiniChallengesCard from "../components/MiniChallengeCard";
import ProgressChallanges from "../components/ProgressChallanges";

const Challange = () => {
  const [challanges, setChallanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChallange, setCurrentChallange] = useState(null);
  const [user, setUser] = useState(null);

  // ambil data user dari local
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        console.error("invalid user data");
      }
    }
  }, []);

  //ambil data challanges
  const fetchChallanges = async () => {
    try {
      const response = await axios.get("http://localhost:8000/challanges/all");
      const filtered = response.data
        .filter(ch => ch.durationType === "weekly")
        .slice(0, 5);
      setChallanges(filtered);
    } catch (error) {
      console.error("Error fetching challanges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallanges();
  }, []);

  // start challanges
  const startChallange = (challange) => {
    setCurrentChallange(challange);
    alert(`Starting Challange: ${challange.name}`);
  };

  // finish challanges dan update point
  const completeChallange = async (challange) => {
    if (!user || !user.id){
      return alert("Login first!");
    }

    try {
      // ngpatch  point usernya
      const response = await axios.patch(
        `http://localhost:8000/users/point/${user.id}`,
        { point: challange.point }
      );
      const updateUser = { ...user, point: response.data.point };
      localStorage.setItem("user", JSON.stringify(updateUser));
      setUser(updateUser);
      setCurrentChallange(null);
      alert(`Challange Completed: ${challange.name}`);
      window.location.reload();
    } catch (error) {
      console.error("Error completing challange:", error);
      alert("Failed to complete challange. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    )
  }
  
  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }  

  return (
    <motion.div
      className="w-full min-h-screen bg-center bg-[#204E51]"
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
        <div className="flex justify-between items-center px-20 gap-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl font-bold text-white">Challanges</h1>
            <img
              src={ChallengeIcon}
              alt="Challange Icon"
              className="w-9 h-10"
            />
          </div>

          <div className="w-64 h-12 text-center p-3 bg-[#3F8DA8] rounded-3xl text-white text-base font-normal font-montserrat">
            <p>
              Current Point:{" "}
              <span className="text-white text-center text-base font-extrabold">
                {(user && user.point) || 0}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-[#E79E3F] w-72 h-16 rounded-2xl mx-auto flex justify-center items-center mt-10">
          <h1 className="text-white text-xl font-extrabold">
            Challanges Progress
          </h1>
        </div>

        <div className="w-full mt-10 flex justify-center items-center pt-2 mb-20 gap-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <ProgressChallanges 
              challange={currentChallange}
              onChallangeComplete={completeChallange}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#F3F0E7] rounded-t-xl">
        <div className="flex justify-between items-center mx-auto px-20 gap-4">
          <div className="w-full flex-col justify-center items-center mt-10">
            {challanges.map((item, index) => (
              <MiniChallengesCard
                key={item._id || index}
                name={item.name}
                point={item.point}
                start={() => startChallange(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Challange;
