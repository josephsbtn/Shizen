const User = require("../model/userModel.js");

const leaderboard = async (id) => {
  try {
    const data = await User.find().sort({ point: -1 });
    let rank = 0;
    const mapping = data.map((user) => {
      rank++;
      return {
        _id: user._id,
        username: user.username,
        point: user.point,
        image: user.image,
        rank: rank,
      };
    });
    const topThree = mapping.slice(0, 3);
    const topTen = mapping.slice(3, 10);
    const currentUser = mapping.filter((user) => user._id.toString() === id);
    return {
      topThree: topThree,
      topTen: topTen,
      currentUser: currentUser,
    };
  } catch (error) {
    console.log("Failed to get leaderboard", error);
    return Error("Failed to get leaderboard");
  }
};

const getProgessChallanges = async (id) => {
  try {
    const user = await User.findById(id).populate({
      path: "completedChallanges",
      populate: {
        path: "challange",
        model: "challanges",
      },
    });
    const challange = user.completedChallanges.map((clg) => {
      return {
        id: clg.challange._id,
        challange: clg.challange.name,
        point: clg.challange.point,
        status: clg.statuss,
      };
    });

    const filter = challange.filter((i) => i.status !== "Done");
    return filter;
  } catch (error) {
    return new Error("Failed to get challanges");
  }
};

const login = async (username, password) => {
  try {
    const user = await User.find({ username: username });
    if (!user) {
      throw new Error("Username not found");
    }
    if (!user.password !== password) {
      throw new Error("Wrong Password");
    }
    return user;
  } catch (error) {
    return Error(error);
  }
};

const register = async (params) => {};

module.exports = {
  leaderboard,
  getProgessChallanges,
};
