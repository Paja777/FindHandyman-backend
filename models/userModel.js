const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  ratingArray: [{
    payloadId: { type: String, required: true },
    payload: { type: String, required: true }
  }],
  ratingNumber: {
    type: String,
    required: true,
  },
});

// static method for user rating
userSchema.statics.rating = async function (creatorId, payloadId, payload) {

  if (creatorId === payloadId) {
    throw Error("You cannot rate your services.");
  }
  // check if already rated
  // const creator = await this.findOne({ creatorId });
  // const exists = creator.ratingArray.find(
  //   (rating) => rating.payloadId === payloadId
  // );
  // if (exists) {
  //   throw Error("You already rated this user."); 
  // }
  // update ratingArray with payload and userId to keep track who rated
  await this.updateOne(
    { _id: creatorId },
    { $push: { ratingArray: { [payloadId]: payload } } }
  );
  // get average rating number
  const sum = ratingArray.reduce((acc, rating) => acc + rating.payload, 0);
  const average = sum / ratingArray.length;
  const averageString = average.toString();
  // update rating property on user model with average rating number
  const updatedRating = await this.updateOne(
    { _id: userId },
    { averageString }
  );

  return averageString;
};

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  role,
  category,
  username
) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    role,
    category,
    username,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  console.log(user);

  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
