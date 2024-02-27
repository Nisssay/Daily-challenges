const model = require('../models/login');
require('dotenv').config();

const login = async (req,res,next) =>{
    try {
        const { username , password} = req.body;
        const user = await model.checkLogin(req.body);
        const userId = await model.getUserId(username , password);
        if (user) {
          req.session.userId = userId; // we give our session the userId so we can make sure that the user can only manipulate his own blogs
          res.json("User connected successfully");
        } else {
            const err = new Error('There are no user with this username/password available');
            err.statusCode = 404;
            throw err;
        }
       } catch (err){
        next(err);
    }
}

const createAccount = async (req,res,next) =>{
    try{
      const user = await model.createAccount(req.body);
      if(user){
        res.send('The user was created successfully');
      }
      else{
        const err = new Error('User account creation failed');
            err.statusCode = 404;
            throw err;
      }
    }catch(err){
      next(err);
    }
}

const logout = (req,res,next) =>{
    try{
      req.session.destroy(err =>{
        if(err){
          return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');
        console.log(req.sessionID);
        console.log(req.cookies)
        res.send("Logged out successfully");
      })
    }
    catch(err){
      next(err)
    }
}

module.exports = {
    login,
    createAccount,
    logout
}