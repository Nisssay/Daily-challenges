const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let products = [
  { "id": 1, "name": "iPhone 12 Pro", "price": 1099.99 },
  { "id": 2, "name": "Samsung Galaxy S21", "price": 999.99 },
  { "id": 3, "name": "Sony PlayStation 5", "price": 499.99 },
  { "id": 4, "name": "MacBook Pro 16", "price": 2399.99 },
  { "id": 5, "name": "DJI Mavic Air 2", "price": 799.99 },
  { "id": 6, "name": "abc", "price": 799.99 },
];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// Search products
app.get("/products/search", (req, res) => {
  const { q, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products];
  console.log(`${typeof q}    , ${typeof minPrice}    , ${typeof maxPrice}`)
  console.log(filteredProducts)

  if (q) {
    filteredProducts = filteredProducts.filter((product) =>
      product["name"].toLowerCase().includes(q.toLowerCase())
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

  res.json(filteredProducts);
});

// Add new product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product by ID
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { id, name, price };
    res.json(products[index]);
  } else {
    res.status(404).send("Product not found");
  }
});
app.delete("/products/:id",(req,res))=

// Delete product by ID
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Product not found");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
