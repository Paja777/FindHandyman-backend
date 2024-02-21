require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const adsRouter = require('./routes/ads');
const mongoose = require('mongoose');

const app = express();

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use("/", adsRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'FindHandyman',
    useNewUrlParser: true,
    useUnifiedTopology: true
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