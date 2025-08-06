const User = require("../model/userModel.js");

const leaderboard = async (id) => {
  try {
    const data = await User.find().sort({ point: -1 });
    let rank = 0;
    const mapping = data.map((user) => {
      rank++;
      return {
        username: user.username,
        point: user.point,
        image: user.image,
      };
    });
    const topThree = mapping.slice(0, 3);
    const topTen = mapping.slice(3, 10);
  } catch (error) {
    console.log("Failed to get leaderboard", error);
    return Error("Failed to get leaderboard");
  }
};

module.exports = {
  leaderboard,
};
