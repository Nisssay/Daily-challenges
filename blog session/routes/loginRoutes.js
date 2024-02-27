const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController');
const middleware = require('../middlewares/middlewares');

router.post('/createuser' , middleware.getUsersValidationRules() , controller.createAccount);
router.post('/login' , middleware.getUsersValidationRules()  , controller.login);
router.get('/logout' , controller.logout);

module.exports = router;