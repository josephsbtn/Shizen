import React from "react";

import trash from "../assets/icons_trash-full-16.svg";

const ProgressChallanges = ({ challange, onChallangeComplete }) => {
  const handleComplete = () => {
    if (onChallangeComplete && challange) {
      onChallangeComplete(challange);
    }
  };

  if (!challange) {
    return (
      <div className="w-96 bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500">No challanges available</p>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-start gap-4 mt-4">
        <img src={trash} alt="Trash Icon" className="w-12 h-12 mb-2" />
        <h2 className="w-[70%] text-[#3F8DA8] text-xl font-extrabold font-montserrat mb-2 text-start">
          {challange.name}
        </h2>
      </div>
      <p className="text-[#ffa629] text-base font-extrabold font-montserrat">
        Reward: <span className="font-bold">{challange.point} Points</span>
      </p>

      <div>
        <button
          onClick={handleComplete}
          className="w-full font-extrabold font-montserrat mt-4 mb-4 bg-[#3F8DA8] text-white px-4 py-2 rounded-lg"
        >
          {challange.isCompleted ? "Completed" : "Complete Challange"}
        </button>
      </div>
    </div>
  );
};

export default ProgressChallanges;
