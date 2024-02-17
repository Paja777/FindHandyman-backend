const Ad = require("../models/adModel");
const mongoose = require("mongoose");

// get all ads
const getAds = async (req, res) => {
  const ads = await Ad.find({}).sort({ createdAt: -1 });
  res.status(200).json(ads);
};

// get single ad
const getAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const ad = await Ad.findById(id);

  if (!ad) {
    return res.status(400).json({ erorr: "No such ad" });
  }
  res.status(200).json(ad);
};

// create a new ad
const createAd = async (req, res) => {
  const { name, category, images, rating } = req.body;

  try {
    const ad = await Ad.create({ name, category, images, rating });
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
};
