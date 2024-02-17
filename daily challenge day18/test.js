const express = require("express");
const fs = require("fs");

let data = fs.readFileSync("data.json");
let products = JSON.parse(data);
// console.log(products)
const app = express();
app.use(express.json());
const port = 3000;
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send("Something broke!");
});

app.get("/products", (req, res) => {
  res.send(products);
});
app.get("/products/search", (req, res) => {
  const { q, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products];

  if (q) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
  } 
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }
  if (filteredProducts.length === 0) {
    return res.status(404).send({ error: "No items match your search" });
  }
  res.send(filteredProducts);
});

app.get("/products/:id", (req, res) => {
  let product = products.filter((product) => product.id == req.params.id);
  res.send(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  fs.writeFileSync("data.json", JSON.stringify(products));
  res.status(201).json(newProduct);
});
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;
  let productIndex = products.findIndex(
    (product) => product.id == req.params.id
  );
  if (name) {
    products[productIndex].name = name;
  }
  if (price) {
    products[productIndex].price = price;
  }

  fs.writeFileSync("data.json", JSON.stringify(products));
  res.status(201).json(products[productIndex]);
});
app.delete("/products/:id", (req, res) => {
  let productIndex = products.findIndex(
    (product) => product.id == req.params.id
  );
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    fs.writeFileSync("data.json", JSON.stringify(products));
    res.send("item deleted");
  } else {
    res.status(404).send("Product not found");
  }
  fs.writeFileSync("data.json", JSON.stringify(products));
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
