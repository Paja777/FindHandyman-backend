require('dotenv').config()

const express = require('express')
const adsRouter = require('./routes/ads')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", adsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db, and listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });