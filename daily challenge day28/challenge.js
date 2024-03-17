const mongoose = require("mongoose");

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: String,
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a Mongoose Model
const ProductModel = mongoose.model("Product", ProductSchema, "products");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample Products
const sampleProducts = [
  { name: "Product 1", price: 10, description: "Description for Product 1" },
  { name: "Product 2", price: 20, description: "Description for Product 2" },
  { name: "Product 3", price: 15, description: "Description for Product 3" },
  { name: "Product 4", price: 25, description: "Description for Product 4" },
  { name: "Product 5", price: 30, description: "Description for Product 5" },
];

// Insert Sample Products
ProductModel.insertMany(sampleProducts)
  .then(() => {
    // Sort Products by Price
    ProductModel.find()
      .sort({ price: -1 })
      .then((sortedProducts) => {
        console.log("Sorted Products by Price:", sortedProducts);

        // Pagination - Limiting Results
        ProductModel.find()
          .limit(5)
          .then((firstPageProducts) => {
            console.log("First Page of Products:", firstPageProducts);

            // Custom Pagination with Variables
            const pageSize = 2;
            const pageNumber = 3;
            ProductModel.find()
              .skip(pageSize * (pageNumber - 1))
              .limit(pageSize)
              .then((customPageProducts) => {
                console.log(
                  `Products for Page ${pageNumber} with Page Size ${pageSize}:`,
                  customPageProducts
                );

                // Aggregation - Count Products in Stock
                ProductModel.aggregate([
                  { $match: { inStock: true } },
                  { $count: "totalInStock" },
                ])
                  .then((countResult) => {
                    console.log("Count of Products in Stock:", countResult);

                    // Aggregation - Calculate Average Price
                    ProductModel.aggregate([
                      { $group: { _id: null, avgPrice: { $avg: "$price" } } },
                    ])
                      .then((avgPriceResult) => {
                        console.log(
                          "Average Price of Products:",
                          avgPriceResult
                        );

                        // Sorting Products by Name in Ascending Order
                        ProductModel.find()
                          .sort({ name: 1 })
                          .then((sortedByName) => {
                            console.log(
                              "Sorted Products by Name:",
                              sortedByName
                            );

                            // Aggregation - Group Products by Category
                            const dynamicPageSize = 4;
                            ProductModel.aggregate([
                              {
                                $group: {
                                  _id: "$category",
                                  products: { $push: "$$ROOT" },
                                },
                              },
                              { $limit: dynamicPageSize },
                            ])
                              .then((groupedByCategory) => {
                                console.log(
                                  "Paginated Products by Category:",
                                  groupedByCategory
                                );

                                // Pagination - Dynamic Results with a Variable
                                ProductModel.aggregate([
                                  {
                                    $group: {
                                      _id: "$category",
                                      products: { $push: "$$ROOT" },
                                    },
                                  },
                                ])
                                  .then((dynamicPaginationResult) => {
                                    console.log(
                                      "Dynamic Pagination Result:",
                                      dynamicPaginationResult
                                    );
                                    mongoose.connection.close(); // Close connection after all operations
                                  })
                                  .catch((err) => console.error("Error:", err));
                              })
                              .catch((err) => console.error("Error:", err));
                          })
                          .catch((err) => console.error("Error:", err));
                      })
                      .catch((err) => console.error("Error:", err));
                  })
                  .catch((err) => console.error("Error:", err));
              })
              .catch((err) => console.error("Error:", err));
          })
          .catch((err) => console.error("Error:", err));
      })
      .catch((err) => console.error("Error:", err));
  })
  .catch((err) => console.error("Error:", err));
