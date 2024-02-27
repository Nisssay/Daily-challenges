const model = require('../models/login');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const login = async (req,res,next) =>{
    try {
        const { username , password} = req.body;
        const user = await model.checkLogin(req.body);
        const userId = await model.getUserId(username , password);
        if (user) {
            const token = jwt.sign({Id : userId , username : username , password : password }, process.env.Token, { expiresIn: '1h' });
            // res.setHeader('Authorization', 'Bearer ' + token);
            res.json({ token : token });
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

module.exports = {
    login,
    createAccount
}