const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // extract properties from db
    const { role, category, username, _id } = await User.login(email, password);
    const token = createToken(_id);

    res.status(200).json({ email, token, role, category, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, role, category, username } = req.body;

  try {
    const user = await User.signup(email, password, role, category, username);
    const token = createToken(user._id);

    res.status(200).json({ email, token, role, category, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const ratingUser = async (req, res) => {
  const { creatorId, payload } = req.body;
  const payloadId = req.user._id;
  try {
    const updatedRating = await User.rating(creatorId, payloadId, payload);
    res.status(200).json({ updatedRating });
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser, signupUser, ratingUser };
