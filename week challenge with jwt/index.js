require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const router = require('./routes/userRoute');
const postRouter = require('./routes/postRoute')



const URI = process.env.MONGO_KEY;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));







mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });




app.use("/users",router);

app.use("/posts",postRouter);

//app.use("/auth",authRouter);


app.listen(3000, () => {
  console.log('app listening on port 3000!');
});