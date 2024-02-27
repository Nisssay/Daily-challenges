const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController');
const middleware = require('../middlewares/middlewares');

// router.get('/login' , controller.getUsers);
router.post('/createUser' , middleware.getUsersValidationRules() , controller.createAccount);
router.post('/login' , middleware.getUsersValidationRules()  , controller.login);

module.exports = router;