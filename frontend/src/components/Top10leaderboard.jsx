import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Top10Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch
  useEffect(() => {
    const fetchTop10Leaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://localhost:8000/users/:id"
        );
        console.log("loading data: ", response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const sortedData = data
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .slice(0, 10)
          .map((user, index) => ({
            ...user,
            rank: index + 4,
          }));
        setLeaderboardData(sortedData);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);

        const mockData = [
          {
            id: 4,
            name: "Charlie",
            points: 700,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 5,
            name: "David",
            points: 600,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 6,
            name: "Eve",
            points: 500,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 7,
            name: "Frank",
            points: 400,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 8,
            name: "Grace",
            points: 300,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 9,
            name: "Heidi",
            points: 200,
            avatar: "https://via.placeholder.com/150",
          },
          {
            id: 10,
            name: "Ivan",
            points: 100,
            avatar: "https://via.placeholder.com/150",
          },
        ];
        setLeaderboardData(mockData);
        setError("Failed to fetch leaderboard data, using mock data instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchTop10Leaderboard();
  }, []);

  const formatPoints = (points) => {
    return (points || 0).toLocaleString();
  };

  const getProfileImage = (avatar, name) => {
    if (avatar && avatar !== "https://via.placeholder.com/150") {
      return avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&size=150`;
  };

  //loading
  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(7)].map((_, index) => (
          <motion.div
            key={index}
            className="w-full p-5 px-20 bg-gray-700 rounded-xl h-full flex items-center justify-between animate-pulse"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-8 bg-gray-500 rounded"></div>
              <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-500 rounded"></div>
            </div>
            <div className="w-24 h-4 bg-gray-500 rounded"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="text-yellow-300 text-sm mb-4 p-2 bg-yellow-900/30 rounded">
          {error}
        </div>
      )}

      {leaderboardData.map((user, index) => (
        <motion.div
          key={user.id || index}
          className="w-full p-5 px-20 bg-green-950 rounded-xl h-full flex items-center justify-between border-2 border-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* rank, pict, name */}
          <div className="flex items-center justify-center gap-6">
            {/* rank */}
            <h2 className="text-4xl font-bold text-white font-montserrat">
              {user.rank}
            </h2>

            {/* pp */}
            <img
              src={getProfileImage(user.avatar, user.name)}
              className="w-16 h-16 bg-white rounded-full object-cover border-2 border-white shadow-lg"
              alt={`${user.name} Profile`}
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Unknown&background=random&size=150";
              }}
            />

            {/* Username */}
            <p className="text-2xl font-semibold text-white font-montserrat">
                {user.name || user.username || "Unknown User"}
            </p>
          </div>

          {/* point */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-right">
                <p className="text-2xl font-bold text-white font-montserrat">
                    {formatPoints(user.points)} Points
                </p>
                <p className="text-sm text-gray-300 font-raleway">
                    Total Score: {formatPoints(user.totalScore)}
                </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Top10Leaderboard;
