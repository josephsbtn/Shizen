import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";

import chart from "../assets/Leaderbord.svg";
import Top10 from "../components/Top10leaderboard";

import crown from "../assets/crown 1.svg";

const Leaderboard = () => {
  const [juara1, setJuara1] = useState({});
  const [juara2, setJuara2] = useState({});
  const [juara3, setJuara3] = useState({});

  const [juara10, setJuara10] = useState([{}]);

  const fetchTop3 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/users/leaderboard/:id"
      );
      const data = response.data.topThree;
      console.log(data);

      setJuara1(data[0]);
      console.log(juara1);
      setJuara2(data[1]);
      setJuara3(data[2]);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchTop10 = async () => {
    axios
      .get("http://localhost:8000/users/leaderboard/:id")
      .then((response) => {
        setJuara10(response.data.topTen);
        console.log(response.data.topTen);
      })
      .catch((error) => {
        console.error("Error fethcing data: ", error);
      });
  };

  useEffect(() => {
    console.log("tes");
    fetchTop3();
    fetchTop10();
  }, []);

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
      <div className="bg-[#204E51] rounded-b-3xl pb-5">
        <div className="flex justify-start items-center px-20 gap-4">
          <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          <img src={chart} alt="" />
        </div>
      </div>
      <div className="flex-grow" />

      {/* juarajuara */}
      <div className="w-[90%] flex flex-col justify-between items-center mx-20 pt-40 bg-[#172829] rounded-t-[100px]">
        {/* TOP 123 */}
        <div className="flex">
          {/* TOp2 */}
          <div className="flex flex-col justify-center items-center mx-auto">
            <div className="w-52 h-52 bg-black rounded-full items-center mx-auto justify-center border-8 border-white">
              <img
                src={juara2.image}
                className="rounded-full w-full bg-cover bg-center object-cover"
                alt=""
              />
              <div className="mx-auto -translate-y-5 w-12 h-12 rounded-full bg-white">
                <h1 className="text-center font-raleway font-bold text-gray-500 p-1 text-4xl">
                  2
                </h1>
              </div>
            </div>
            <div className="flex-col justify-center pt-5">
              <p className="text-white font-medium text-2xl text-center w-[50%]">
                {juara2.username}
              </p>
              <p className="text-white font-medium text-2xl text-center mx-auto w-[50%]">
                {juara2.point}
              </p>
            </div>
          </div>

          {/* TOp1 */}
          <div className="flex flex-col justify-center items-center mx-auto -translate-y-28">
            <img
              src={crown}
              className="w-24 translate-y-8 rotate-12 translate-x-8"
              alt=""
            />
            <div className="w-52 h-52 bg-black rounded-full items-center mx-auto justify-center border-8 border-white">
              <img
                src={juara1.image}
                className="rounded-full w-full bg-cover bg-center object-cover"
                alt=""
              />
              <div className="mx-auto -translate-y-5 w-12 h-12 rounded-full bg-white">
                <h1 className="text-center font-raleway font-bold text-yellow-500 p-1 text-4xl">
                  1
                </h1>
              </div>
            </div>
            <div className="flex-col justify-center pt-5">
              <p className="text-white font-medium text-2xl text-center w-[50%]">
                {juara1.username}
              </p>
              <p className="text-white font-medium text-2xl text-center mx-auto w-[50%]">
                {juara1.point}
              </p>
            </div>
          </div>

          {/* TOp3 */}
          <div className="flex flex-col justify-center items-center mx-auto">
            <div className="w-52 h-52 bg-black rounded-full items-center mx-auto justify-center border-8 border-white">
              <img
                src={juara3.image}
                className="rounded-full w-full bg-cover bg-center object-cover"
                alt=""
              />
              <div className="mx-auto -translate-y-5 w-12 h-12 rounded-full bg-white">
                <h1 className="text-center font-raleway font-bold text-yellow-800 p-1 text-4xl">
                  3
                </h1>
              </div>
            </div>
            <div className="flex-col justify-center pt-5">
              <p className="text-white font-medium text-2xl text-center w-[50%]">
                {juara3.username}
              </p>
              <p className="text-white font-medium text-2xl text-center mx-auto w-[50%]">
                {juara3.point}
              </p>
            </div>
          </div>
        </div>

        {/* Top 10 */}
        <div className="flex w-[90%] mx-auto items-center flex-col rounded-[100px] bg-white/50 justify-center py-10 mt-10">
          {juara10.map((juara10, i) => (
            <div
              key={i}
              className="w-[80%] h-28 bg-white my-4 rounded-3xl shadow-lg flex justify-between items-center px-6"
            >
              <div className="flex gap-4 items-center">
                <span className="text-4xl font-bold text-[#204E51]">
                  {juara10.rank}.
                </span>
                <img
                  src={juara10.image}
                  alt={juara10.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-2xl font-semibold text-[#204E51]">
                    {juara10.username}
                  </p>
                  <p className="text-xl text-gray-600">{juara10.point} points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
