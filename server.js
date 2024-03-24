require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const adsRoutes = require('./routes/ads');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://find-handyman.onrender.com/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  // Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  
  next();
});

// app.use(cors({
//     origin: 'https://find-handyman.onrender.com/',
//     credentials: true 

// }));

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