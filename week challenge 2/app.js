const express = require("express");
const blogRouter = require("./routes/postRoutes")


const app = express();
const PORT = 3000;
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/blog",blogRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
