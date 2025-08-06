const express = require("express");
const router = express.Router();
const {
  finishChallanges,
  startChallanges,
} = require("../service/challangesService.js");

router.post("/start", async (req, res) => {
  try {
    const { idUser, idChallanges } = req.body;
    const response = await startChallanges(idUser, idChallanges);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

router.post("/finish", async (req, res) => {
  try {
    const { idUser, idChallanges } = req.body;
    const response = await finishChallanges(idUser, idChallanges);
    res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
