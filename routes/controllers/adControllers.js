const Ad = require("../models/adModel");
const mongoose = require("mongoose");

// get all ads
const getAds = async (req, res) => {
  res.status(200).json("Alooo sve ok");
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

module.exports = {
    createAd,
    getAds,

}
