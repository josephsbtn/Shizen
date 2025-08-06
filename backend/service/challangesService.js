const User = require("../model/userModel.js");
const Challanges = require("../model/challangesModel.js");

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

const startChallanges = async (idUser, idChallange) => {
  try {
    console.log("tes");
    const user = await User.findById(idUser);
    console.log(user);

    if (user.completedChallanges.length > 0) {
      const isAlready = user.completedChallanges.find(
        (clg) =>
          clg.challange.toString() === idChallange && clg.status === "Progress"
      );
      console.log("is already");
      if (isAlready) {
        throw new Error("Challanges has already started ");
      }
    }

    console.log("updateing");
    user.completedChallanges.push({
      completedChallanges: {
        challange: idChallange,
        status: "Progress",
      },
    });

    console.log(user);

    user.save();
    return user;
  } catch (error) {
    return new Error("Failed to get challanges", error.message);
  }
};

module.exports = {
  getProgessChallanges,
  startChallanges,
};
