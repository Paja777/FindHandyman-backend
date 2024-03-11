const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { findOne } = require("./adModel");

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
  ratingArray: {
    type: [{ type: Object }],
    required: true 
    },
  ratingNumber: {
    type: Number,
    required: true,
  },
});

// static method for user rating
userSchema.statics.rating = async function (creatorId, payloadUserId, payload) {
  // check if rates own ad
  if (creatorId === payloadUserId) {
    throw Error("You cannot rate your own ad.");
  }
  // check if already rated
  const adCreator = await this.findOne({ _id: creatorId });
  console.log( 'adCreator:', adCreator);
  const exists = adCreator.ratingArray.find(
    (rating) => rating.payloadId === payloadUserId
  );
  console.log(exists);

  if (exists) {
    throw Error("You already rated this user.");
  }
  // update ratingArray with payload and userId to keep track who rated
  const updatedAdCreator = await this.findOneAndUpdate(
    { _id: creatorId },
    { $push: { ratingArray: { payloadId: payloadUserId, payload: payload } } }
  );
  // get average rating number
  const { ratingArray } = updatedAdCreator;
  const sum = ratingArray.reduce((acc, rating) => acc + rating.payload, 0);
  console.log(sum)
  const average = sum / (ratingArray.length - 1);

  // update rating property on user model with average rating number
  await this.updateOne({ _id: creatorId }, { ratingNumber: average });

  return average;
};

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  role,
  category,
  username,
  ratingArray,
  ratingNumber
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
    ratingArray,
    ratingNumber,
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
