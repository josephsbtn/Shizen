import daun from "../assets/pajamas_nature.svg";

const MiniChallengeCard = ({ name, point, start }) => {
  return (
    <div className="w-[80%] h-24 flex mx-auto justify-between bg-[#4A6765] rounded-3xl shadow-md m-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center p-4 gap-4">
          <img src={daun} alt="Daun" />
        </div>
        <div>
          <p className="text-white text-base font-extrabold font-montserrat">
            {name}
          </p>
          <p className="text-[#ffa629] text-base font-extrabold font-montserrat">
            Reward: {point}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={start}
          className="w-full font-extrabold font-montserrat mt-4 mb-4 bg-[#3F8DA8] text-white px-4 py-2 rounded-lg">
          START
        </button>
      </div>
    </div>
  );
};

export default MiniChallengeCard;
