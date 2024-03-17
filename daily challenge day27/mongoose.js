const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/abc")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  age: { type: Number },
});

const User = mongoose.model("User", userSchema);

const newUser = new User({
  name: "Mike Ross",
  email: "mike.ross@arkx.group",
  age: 30,
});

// newUser
//   .save()
//   .then((user) => console.log("User created successfully: ", user))
//   .catch((error) => console.log("Error creating user: ", error));

// User.findOne({ name: "Mike Ross" })
//   .then((user) => {
//     if (user) console.log(user);
//     else console.log("User not found");
//   })
//   .catch((error) => console.log("Error fetching user: ", error));

// User.find()
//   .then((users) => {
//     if (users.length > 0) console.log(users);
//     else console.log("No users found");
//   })
//   .catch((error) => console.log("Error fetching users: ", error));

// User.findOneAndUpdate(
//   { email: "mike.ross@arkx.group" },
//   { $set: { email: "notmike.ross@arkx.group" } }
// )
//   .then((user) => {
//     if (user) console.log("User updated successfully: ", user);
//     else console.log("User not found");
//   })
//   .catch((error) => console.log("Error updating user: ", error));

// User.findOne({ name: "Mike Ross" })
//   .then((user) => {
//     if (user) console.log(user);
//     else console.log("User not found");
//   })
//     .catch((error) => console.log("Error fetching user: ", error));
  
// function deleteUsers(date) {
    
// }
let specificDate = new Date("2024-02-26");
// console.log(sp)
User.deleteMany({ createdAt: { $gt: specificDate } })
  .then((result) => {
    if (result.deletedCount > 0) {
      console.log("Users deleted successfully:", result.deletedCount);
    } else {
      console.log("No users found");
    }
  })
  .catch((error) => console.log("Error deleting users: ", error));

