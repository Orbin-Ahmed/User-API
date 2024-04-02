const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register User
//@route POST /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field is mendatory");
  }
  //Check if the user already exist
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field is mendatory");
  }
  //Check if the user exist
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Email or password is not valid!");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401);
    throw new Error("You are not authorized!");
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
