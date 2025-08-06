const express = require("express");
const app = express();
const cors = require("cors");
const { dbconnect } = require("./config/database.js");
const { MLresult } = require("./service/predictService.js");

app.use(express.json());
app.use(cors());
dbconnect()
  .then(() => {
    MLresult("Salatiga");
    app.listen(8000, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => {
    console.log("Server connection failed", err);
  });
