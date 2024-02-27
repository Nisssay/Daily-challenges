const session = require("express-session");

exports.sessionMiddleware = session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure: true if using HTTPS
});

exports.logTime = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
exports.logError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
