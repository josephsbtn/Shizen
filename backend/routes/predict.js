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

router.post("/disease/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const { cough, fever, fatigue } = req.body;
    const result = await getDiease(city, cough, fatigue, fever);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
