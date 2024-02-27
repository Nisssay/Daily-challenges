const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
const { addUser, protected, login,logout } = require("./controller");
const { sessionMiddleware,logTime, logError } = require("./middelwear");
router.use(logError);
router.use(logTime);
router.use(sessionMiddleware);
router.get("/protected",protected);
router.post("/register", addUser);
router.post("/login", login);
router.get("/logout",logout)

module.exports = router