const passport = require('passport');


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("authenticated");
        return next();
    } else {
        return res.status(401).send('Unauthorized');
    }
};

module.exports = isAuthenticated;