const fs = require("fs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
var jwt = require("jsonwebtoken");
let usersData = fs.readFileSync("./users.json", "utf-8");
let users = JSON.parse(usersData);
exports.login = [
  // Input sanitization and validation middleware
  body("username").trim().escape(),
  body("password").trim().escape(),
  // Request handler
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    let user = users.find(
      (u) => u.username == username && u.password == password
    );
    if (user) {
      req.session.userId = user.id;
      console.log(user.id);
      return res
        .status(200)
        .send({ message: `Welcome back ${user.username}!` });
    } else {
      return res.status(401).send({ error: "Invalid credentials!" });
    }
  },
];

exports.addUser = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage("username must not be empty"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("password must not be empty"),
  // Request handler
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation succeeds, continue with adding blog logic
    console.log(users);
    const { username, password } = req.body;
    console.log(username, password);
    const id = users[users.length - 1].id + 1;
    // const id = users.length + 1;
    console.log("id", id);
    const newUser = { id, username, password };
    users.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.status(201).json(newUser);
  },
];

exports.protected = (req, res) => {
  // Check if the user is authenticated
  if (req.session.userId) {
    // User is authenticated, send protected data
    console.log("id", req.session.userId);
    res.send(users);
  } else {
    // User is not authenticated, send unauthorized error
    res.status(401).send("Unauthorized");
  }
};

exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session");
    }
    // Clear the session cookie
    res.clearCookie("connect.sid");
    return res.status(200).send("Logged out successfully");
  });
};


