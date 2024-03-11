const Ad = require("../models/adModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

// get all ads
const getAds = async (req, res) => {
  const { searchTerm } = req.query;
  
  if (!searchTerm || searchTerm === '') {
    const ads = await Ad.find({}).sort({ cratedAt: -1 });
    res.status(200).json(ads);
    return;
  }
  const ads = await Ad.find({
    category: { $regex: `^${searchTerm}`, $options: "i" },
  }).sort({ createdAt: -1 });
  
  res.status(200).json(ads);
};

// get my ads
const getMyAds = async (req, res) => {
  const user_id = req.user._id;
  const ads = await Ad.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(ads);
};

// get single ad
const getAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ad" });
  }
  const ad = await Ad.findById(id);

  if (!ad) {
    return res.status(400).json({ erorr: "No such ad" });
  }
  res.status(200).json(ad);
};

// create a new ad
const createAd = async (req, res) => {
  const {
    name,
    category,
    images,
    rating,
    services,
    description,
    note,
    adRole,
  } = req.body;

  try {
    // extracting user id from request headers
    const user_id = req.user._id;
    const creatorRating = await User.findOne({_id: user_id}).select("ratingNumber")
    console.log(creatorRating.ratingNumber);
    const ad = await Ad.create({
      name,
      category,
      images,
      rating: creatorRating.ratingNumber,
      services,
      description,
      note,
      adRole,
      user_id,
    });
    res.status(200).json(ad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete ad
const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ad" });
  }

  const ad = await Ad.findOneAndDelete({ _id: id });

  if (!ad) {
    return res.status(400).json({ error: "No such ad" });
  }

  res.status(200).json(ad);
};

// update ad
const updateAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ad" });
  }

  const ad = await Ad.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!ad) {
    return res.status(400).json({ error: "No such ad" });
  }

  res.status(200).json(ad);
}; 

module.exports = {
  createAd,
  getAds,
  getAd,
  deleteAd,
  updateAd,
  getMyAds,
};
