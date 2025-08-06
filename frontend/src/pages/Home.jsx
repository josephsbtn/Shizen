import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <div
      className="w-full h-screen bg-blue-500 bg-cover bg-center"
      style={{ backgroundImage: "url('BgHome.png')" }}
    >
      <div className="py-2">
        <Navbar />
      </div>

      <div className="w-full flex flex-col justify-center items-center pt-40">
        <h1 className="text-white text-8xl font-bold font-montserrat text-center w-[72%]">
          Seberapa Sehat Udara di Kotamu Hari Ini?
        </h1>
        <p className="text-white text-center text-2xl font-light font-raleway leading-normal w-[35%]">
          Cek nilai hidupmu berdasarkan kualitas udara lokal
        </p>
      </div>

      <div className="w-[40%] mx-auto rounded-3xl border-2 border-white p-2 ">
        <Searchbar />
      </div>
    </div>
  );
};

export default Home;
