const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(csurf({ cookie: true }));

// Routes
app.get("/", (req, res) => {
  let a = req.csrfToken() 
  console.log(a)
  res.render("index", { csrfToken: a});
});

// Input validation and secure authentication
app.post(
  "/login",
  [
    body("username").isLength({ min: 5 }).trim().escape(),
    body("password").isLength({ min: 8 }).trim().escape(),
  ],
  async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).redirect("/");
        }

        console.log(req.body._csrf);
        const { username, password } = req.body;
        // Authenticate user with secure password comparison
        const hashedPassword = await bcrypt.hash("password", 10);
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (req.body._csrf)
          if (username === "admin" && validPassword) {
            req.session.isAuthenticated = true;
            req.session.username = username;
            return res.redirect("/dashboard");
          } else {
            return res.redirect("/");
          }
      } catch (error) {
        console.error("Login error:", error);
        return res.status(500).redirect("/");
      }
  }
);

app.get("/dashboard", (req, res) => {
  // Secure dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
