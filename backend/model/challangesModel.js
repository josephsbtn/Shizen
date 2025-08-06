const mongoose = require("mongoose");

const challangeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  typeChallanges: {
    type: String,
    enum: [
      "dailyAction",
      "outdoorActivity",
      "education",
      "community",
      "reporting",
      "planting",
      "wasteManagement",
      "transportation",
      "energySaving",
    ],
  },
  durationType: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
  },
  point: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
});

const model = mongoose.model("challanges", challangeSchema);
module.exports = model;
