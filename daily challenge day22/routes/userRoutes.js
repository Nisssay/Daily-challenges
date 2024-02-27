const router = require('express').Router();
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
const { addUser, updateUser, deleteUser, getAllUsers, getUser, login, page } = require("../controllers/userController")
const {
  verifyToken,
  logTime,
  logError,
} = require("../middelweares/middelware");
router.use(logError);
router.use(logTime);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.post("/register",addUser);
router.put("/:id", verifyToken, updateUser);  
router.delete("/:id", verifyToken, deleteUser);
router.post('/login', login); 





module.exports = router