const User = require("../model/userModel.js");
const Challanges = require("../model/challangesModel.js");

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
      if (isAlready) {
        throw new Error("Challanges has already started ");
      }
    }

    user.completedChallanges.push({
      completedChallanges: {
        challange: idChallange,
        status: "Progress",
      },
    });

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
