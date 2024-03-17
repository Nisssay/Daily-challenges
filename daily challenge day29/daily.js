const mongoose = require("mongoose")
require("dotenv").config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error(err));

const productShema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: String,
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  expirationDate: Date
});
const productModel = mongoose.model("Product", productShema);
// const products = [
//   {
//     name: "Laptop",
//     price: 1200,
//     description: "High-performance laptop with powerful specs.",
//     inStock: true,
//   },
//   {
//     name: "Smartphone",
//     price: 800,
//     description: "Latest smartphone with advanced features.",
//     inStock: true,
//   },
//   {
//     name: "Headphones",
//     price: 150,
//     description: "Over-ear headphones with noise-cancelling technology.",
//     inStock: true,
//   },
//   {
//     name: "Smartwatch",
//     price: 250,
//     description: "Fitness tracker and smartwatch with health monitoring.",
//     inStock: false,
//   },
//   {
//     name: "Camera",
//     price: 600,
//     description: "Digital camera with high-resolution imaging.",
//     inStock: true,
//   },
//   {
//     name: "Gaming Console",
//     price: 400,
//     description: "Next-gen gaming console for immersive gaming experiences.",
//     inStock: true,
//   },
//   {
//     name: "Bluetooth Speaker",
//     price: 80,
//     description: "Portable Bluetooth speaker with crisp sound.",
//     inStock: true,
//   },
//   {
//     name: "Tablet",
//     price: 300,
//     description: "Slim and lightweight tablet for on-the-go productivity.",
//     inStock: true,
//   },
//   {
//     name: "Coffee Maker",
//     price: 50,
//     description: "Automatic coffee maker for brewing your favorite coffee.",
//     inStock: true,
//   },
//   {
//     name: "Fitness Tracker",
//     price: 100,
//     description: "Wearable fitness tracker with heart rate monitoring.",
//     inStock: false,
//   },
//   {
//     name: "External Hard Drive",
//     price: 120,
//     description: "Large-capacity external hard drive for data storage.",
//     inStock: true,
//   },
//   {
//     name: "Wireless Mouse",
//     price: 30,
//     description: "Ergonomic wireless mouse for comfortable computing.",
//     inStock: true,
//   },
//   {
//     name: "Portable Charger",
//     price: 20,
//     description: "Compact portable charger for on-the-go device charging.",
//     inStock: true,
//   },
//   {
//     name: "Smart Bulbs",
//     price: 15,
//     description: "Set of smart bulbs for customizable lighting at home.",
//     inStock: true,
//   },
//   {
//     name: "Backpack",
//     price: 40,
//     description: "Durable backpack with multiple compartments for storage.",
//     inStock: true,
//   },
//   {
//     name: "Wireless Earbuds",
//     price: 120,
//     description: "True wireless earbuds for immersive audio experiences.",
//     inStock: false,
//   },
//   {
//     name: "Graphic Tablet",
//     price: 200,
//     description: "Digital graphic tablet for artists and designers.",
//     inStock: true,
//   },
//   {
//     name: "Desk Chair",
//     price: 150,
//     description: "Comfortable desk chair with adjustable features.",
//     inStock: true,
//   },
//   {
//     name: "Air Purifier",
//     price: 80,
//     description: "HEPA air purifier for cleaner and fresher indoor air.",
//     inStock: true,
//   },
//   {
//     name: "Electric Toothbrush",
//     price: 40,
//     description: "Electric toothbrush for effective dental care.",
//     inStock: true,
//   },
// ];
// const products = [
//   {
//     name: "Laptop",
//     price: 1200,
//     description: "High-performance laptop with powerful specs.",
//     inStock: true,
//   },
//   {
//     name: "Smartphone",
//     price: 800,
//     description: "Latest smartphone with advanced features.",
//     inStock: true,
//   },]
// async function addProducts() {
//   let p = await  productModel.create(products);
//   console.log("Added products");
// }

// addProducts()


// async function updatePrice(productName, newPrice) {
//   const updatedProduct = await productModel.findOneAndUpdate({
//     name:productName
//   },
//     { price: newPrice })
//   if (updatedProduct) {
//     console.log(updatedProduct)
//   } else {
//     console.log("somthing went wrong")
//   }
// }

// updatePrice("Electric Toothbrush",200);
// async function updateIsDeleted(productName) {
//   const updatedProduct = await productModel.findOneAndUpdate({
//     name:productName
//   },
//     { isDeleted: true })
//   if (updatedProduct) {
//     console.log(updatedProduct)
//   } else {
//     console.log("somthing went wrong")
//   }
// }
// updateIsDeleted("Laptop")

// async function updateExpirationDate(productName) {
//   const updatedProduct = await productModel.findOneAndUpdate({
//     name:productName
//   },
//     { expirationDate: "2024-02-02T18:36:09.052+00:00" })
//   if (updatedProduct) {
//     console.log(updatedProduct)
//   } else {
//     console.log("somthing went wrong")
//   }
// }
// updateExpirationDate("Laptop");
// async function hardDelete() {
//   const delCount = productModel.deleteMany({ expirationDate: { $lt: new Date() } })
//   if (delCount) {
//     console.log("number of deleted products is ",(await delCount).deletedCount)
//   } else {
//     console.log("somthing is wrong")
//   }
// }
// hardDelete();

// async function UpdateInStockProducts() {
//   const productsUpdated = await productModel.updateMany({ inStock: true }, { description: "zzzzzzzzzzzzzzzzz" })
//   if (productsUpdated) {
//     console.log(productsUpdated)
//   } else {
//     console.log("no products in stock")
//   }
// }
// UpdateInStockProducts()

async function deleteOutOfStockP() {
  try {
      const delCount = await productModel.deleteMany({ inStock: false })
      console.log("item deleted is",delCount.deletedCount)
  } catch (err) {
    console.error(err)
  }
  
}
deleteOutOfStockP()