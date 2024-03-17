const jwt = require("jsonwebtoken")
  function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (typeof authHeader !== "undefined") {
      const authToken = authHeader.split(" ")[1];
      jwt.verify(authToken, process.env.token, (err, data) => {
        if (err) {
          console.log("erreur verifying token");
          res.sendStatus(403);
        } else {
          req.user = data;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
module.exports = verifyToken