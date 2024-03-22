require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const adsRoutes = require('./routes/ads');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const app = express();

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  
  next();
});

app.use(cors({
    origin: 'https://find-handyman.onrender.com/',
    credentials: true 
}));

app.use("/ad", adsRoutes);
app.use("/user", userRoutes);

mongoose 
  .connect(process.env.MONGO_URI, {
    dbName: 'FindHandyman',
  })
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db, and listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });