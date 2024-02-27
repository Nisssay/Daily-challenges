const model = require('../models/login');
require('dotenv').config();

const logout = (req,res,next) => {
  try {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.send("Logged out successfully");
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
    
    logout
}