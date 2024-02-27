
const { body, validationResult } = require('express-validator');
const session = require('express-session');
require('dotenv').config();


const loggingMiddleware = (req,res,next) => {
    const method = req.method;
    const path = req.path;
 
    console.log("Method of the request is : ",method ,"\nPath of the request is : ",path);
    next();
 }

const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || 'error';
    err.statusCode = err.statusCode || 500;  
    
    res.status(err.statusCode).json({message : err.message});
}

const getUsersValidationRules = () => { // middleware to sanitize the user inputs
    return [
        body('username').trim().isLength({ min: 5 }).escape(), 
        body('password').trim().isLength({ min: 5 }).escape(), 
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
  };
const getBlogsValidationRules = () => { // middleware to sanitize the user inputs
    return [
        body('Title').trim().isLength({ min: 4 }).escape(), 
        body('Content').trim().isLength({ min: 4 }).escape(), 
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
  };


module.exports = {
    loggingMiddleware,
    errorMiddleware,
    getUsersValidationRules,
    getBlogsValidationRules
}