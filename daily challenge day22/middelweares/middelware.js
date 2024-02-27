const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    req.user = decoded.data;
    next();
  });
};

exports.logTime = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
exports.logError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
// module.exports = verifyToken
// module.exports = logTime
// module.exports = logError