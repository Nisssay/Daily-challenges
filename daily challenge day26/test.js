const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));
const db = client.db("abc");
const collection = db.collection("users");
collection
  .insertOne({ name: "Aadian", age: "25" })
  .then((user) => console.log("User Created Successfully: ", user))
  .catch((error) => console.log("Error: ", error));

collection
  .find().toArray()
  .then((user) => console.log(user))
  .catch((error) => console.log("Error: ", error));