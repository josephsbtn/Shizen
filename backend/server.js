const express = require("express");
const app = express();
const cors = require("cors");
const { dbconnect } = require("./config/database.js");

const predictRoutes = require("./routes/predict.js");
const userRoutes = require("./routes/user.js");
const { getInputData } = require("./service/predictService.js");

app.use(express.json());
app.use(cors());
dbconnect()
  .then(() => {
    getInputData(-6.3111, 106.7619);
    app.use("/predict", predictRoutes);
    app.use("/users", userRoutes);
    app.listen(8000, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => {
    console.log("Server connection failed", err);
  });
