const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify authentification
  const { authorization } = req.headers;
  console.log(authorization)
  if (!authorization) {
    return res.status(401).json({ erorr: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const {_id} = jwt.verify(token, process.env.SECRET);
    console.log(_id);
    

    // find user with id from token and select only id property
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth
