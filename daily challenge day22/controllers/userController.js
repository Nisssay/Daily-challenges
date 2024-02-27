const fs = require("fs");
const { getALLUsers, createUser } = require("../models/user");
const { body, validationResult } = require("express-validator");
const { get } = require("http");
require("dotenv").config();
var jwt = require("jsonwebtoken");
let users = getALLUsers();

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
      var token = jwt.sign({ data: user }, process.env.TOKEN, {
        expiresIn: "1h",
      });
      console.log(`Token : ${token}`);
      return res
        .status(200)
        .send({ message: `Welcome back ${user.username}!`, token: token });
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
    // const id = users[users.length - 1].id + 1;
    const id = users.length + 1;
    console.log("id", id);
    const newUser = { id, username, password };
    users.push(newUser);
    createUser(users);
    res.status(201).json(newUser);
  },
];

exports.getAllUsers = (req, res) => {

  if (req.user.username === "admin") {
    res.send(users);
  } else {
    res.send("you dont have the permissions to see all users");
  }
};

exports.getUser = (req, res) => {
  const userId = req.params.id;
  if (req.user.username === "admin") {
    const userinfo = users.find((user) => user.id == userId);

    if (!userinfo) return res.status(404).json({ msg: "user not found" });
    res.status(200).json(userinfo);
  } else {
    res.send("you dont have the permissions to see  users");
  }
};
exports.updateUser = [
  // Input sanitization and validation middleware
  body("username").optional().trim().escape(),
  body("password").optional().trim().escape(),
  // Request handler
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.username === "admin") {
      let userId = req.params.id;
      let { username, password } = req.body;
      let userIndex = users.findIndex((item) => item.id == userId);
      if (userIndex === -1) {
        return res.status(404).json({ msg: "No such user found!" });
      }

      if (username) {
        users[userIndex].username = username;
      }
      if (password) {
        users[userIndex].password = password;
      }
      createUser(users);
      res.status(200).json({ msg: "Updated Successfully", users });
    } else {
      res.send("you dont have the permissions to update users");
    }
  },
];

exports.deleteUser = (req, res) => {
  if (req.user.username === "admin") {
    let userId = req.params.id;
    let userIndex = users.findIndex((item) => item.id == userId);
    if (userIndex === -1)
      return res.status(404).json({ msg: "No such user found!" });
    // let removedBlog = blogs[postIndex];
    users.splice(userIndex, 1);
    createPost(users);
    res.status(200).json({ msg: "Deleted Successfully", users });
  } else {
    res.send("you dont have the permissions to delete users");
  }
};
