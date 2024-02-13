// Import the express module
const express = require("express");
const PORT = 3001;
const app = express();

// Define a route handler for the root URL (/)
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js server!");
});

// Configure the application to listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
