const express = require("express");
const validateToken = require("../middleware/validationHandler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current-user", validateToken, currentUser);

module.exports = router;
