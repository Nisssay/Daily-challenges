// const mongoose = require("mongoose");
// // const uri ="mongodb+srv://yassine:1234@cluster0.qztpll2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// require("dotenv").config();

// const uri = process.env.MONGODB_URIURI;
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((error) => {
//     console.log("Error connecting to database: ", error);
//   });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

app.get( "/", (req, res) => {
  res.send({ message: "Hello World!"});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
