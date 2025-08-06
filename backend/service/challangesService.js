const User = require("../model/userModel.js");
const Challanges = require("../model/challangesModel.js");
const { getProgessChallanges } = require("./userService.js");

const getAllChalangesByiD = async (idUser) => {
  try {
    const data = await Challanges.find();
    const progress = await getProgessChallanges(idUser);
    const filter = data.filter((item) => progress.includes(item._id));
    console.log(filter);
    return filter;
  } catch (error) {
    return new Error("Failed to get challanges", error.message);
  }
};

const getAllChalangesAll = async () => {
  try {
    const data = await Challanges.find();
    const filter = data.filter((item) => item.durationType === "weekly");
    console.log(filter);
    return filter;
  } catch (error) {
    return new Error("Failed to get challanges", error.message);
  }
};

const startChallanges = async (idUser, idChallange) => {
  try {
    const user = await User.findById(idUser);

    if (user.completedChallanges.length > 0) {
      let isAlready = false;
      user.completedChallanges.forEach((clg) => {
        if (
          clg.challange.toString() === idChallange &&
          clg.status === "Progress"
        ) {
          isAlready = true;
        }
      });

      console.log("cek", isAlready);
      if (isAlready) {
        throw new Error("Challanges has already started ");
      }
    }
    // console.log(user);

    const update = await User.findByIdAndUpdate(idUser, {
      $push: {
        completedChallanges: {
          challange: idChallange,
          status: "Progress",
        },
      },
    });

    console.log("update", update);
    user.save();
    return user;
  } catch (error) {
    return new Error("Failed to get challanges", error.message);
  }
};

const finishChallanges = async (idUser, idChallange) => {
  try {
    const user = await User.findById(idUser);
    const challanges = user.completedChallanges;
    challanges.forEach((clg) => {
      if (clg.challange.toString() === idChallange) {
        console.log("Done");
        clg.status = "Done";
      }
    });
    user.save();
    return "Success";
  } catch (error) {
    return new Error("Failed to get challanges", error.message);
  }
};

module.exports = {
  startChallanges,
  finishChallanges,
  getAllChalangesByiD,
  getAllChalangesAll,
};
