const express = require("express");
const app = express();
const cors = require("cors");
const { dbconnect } = require("./config/database.js");

const predictRoutes = require("./routes/predict.js");
const userRoutes = require("./routes/user.js");
const {
  getProgessChallanges,
  startChallanges,
} = require("./service/challangesService.js");

app.use(express.json());
app.use(cors());
dbconnect()
  .then(() => {
    startChallanges("688600d34a1923f6c3d2732d", "6885ec664a1923f6c3d27241");
    app.use("/predict", predictRoutes);
    app.use("/users", userRoutes);
    app.listen(8000, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => {
    console.log("Server connection failed", err);
  });
