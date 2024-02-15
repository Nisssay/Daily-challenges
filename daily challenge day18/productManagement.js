const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const loggingMiddleware = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  console.log(logMessage); // Replace with your logging mechanism (e.g., file writing)
  next();
};

// Usage: Apply middleware globally
app.use(loggingMiddleware);

const errorHandlingMiddleware = (err, req, res, next) => {
  const errorMessage = "An error occurred. Please try again later.";
  console.error(err.message); // Log the error message
  res.status(500).json({ message: errorMessage });
};

// Usage: Apply middleware globally
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
