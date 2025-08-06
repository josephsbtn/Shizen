const express = require("express");
const router = express.Router();
const {
  leaderboard,
  getProgessChallanges,
  register,
  login,
} = require("../service/userService.js");

router.get("/progress/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getProgessChallanges(id);
    return res.status(200).send(result);
  } catch (error) {}
});

router.get("/leaderboard/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await leaderboard(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const reg = register(username, email, password);
    res.status(201).send(reg);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const reg = login(username, password);
    res.status(201).send(reg);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
