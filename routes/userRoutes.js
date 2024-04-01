const express = require("express");
const router = require("./contactRoutes");
const roter = express.Router();

router.post("/register", async (req, res) => {
  res.send("User is regisered!");
});

router.post("/login", async (req, res) => {
  res.send("User is login!");
});

router.get("/current-user", async (req, res) => {
  res.send("Current user!");
});

module.exports = router;
