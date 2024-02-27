
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
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

const getUsersValidationRules = () => {
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

  function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        const authToken = authHeader.split(' ')[1];
        jwt.verify(authToken, process.env.token, (err, data) => {
            if (err) {
                console.log("erreur verifying token")
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


module.exports = {
    loggingMiddleware,
    errorMiddleware,
    getUsersValidationRules,
    verifyToken
}