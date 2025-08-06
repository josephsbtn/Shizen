import React, { useState, useEffect } from "react";
import axios from "axios";
import tes from "../assets/tolol.png";

const Leaderboard410 = () => {
  const [daftarJuara, setDaftarJuara] = useState([]);
  const [juara1, setJuara1] = useState();
  const [juara2, setJuara2] = useState();
  const [juara3, setJuara3] = useState();

  const fetchData = async () => {
    await axios.get("http://localhost:8000/user").then((response) => {
      setDaftarJuara(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [])

  return (
    // No, pict, name, point
    <div className="w-[80%] h-24 bg-[#72a2a3] rounded-3xl">
      <div className="flex justify-between items-center mx-10 text-2xl font-bold font-raleway p-2">
        <div className="flex justify-center items-center gap-10">
          <h2>4</h2>
          <img
            className="w-20 h-20 bg-cover object-cover rounded-full bg-center"
            src={tes}
            alt=""
          />
          <h2>Nolan</h2>
        </div>
        <div>
          <p className="font-light">100 point</p>
        </div>
      </div>
    </div>
  );
};
export default Leaderboard410;
