const express = require("express");
const router = express.Router();
const { MLresult, getDiease } = require("../service/predictService.js");

router.get("/request/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const result = await MLresult(city);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/disease/:city/:fever/:cough/:fatigue", async (req, res) => {
  try {
    const city = req.params.city;
    const cough = req.params.cough;
    const fever = req.params.fever;
    const fatigue = req.params.fatigue;
    const result = await getDiease(city, cough, fatigue, fever);
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    console.log("errorr anjayy", error.message);
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
