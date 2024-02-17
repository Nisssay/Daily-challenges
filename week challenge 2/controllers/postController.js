const fs = require("fs");
const { getAllPosts, createPost } = require("../models/post");
const { normalize } = require("path");

exports.addBlog = (req, res) => {
  const blogs = getAllPosts();
  const { name, content } = req.body;
  const id = blogs.length + 1;
  const newBlog = { id, name, content };
  blogs.push(newBlog)
  createPost(blogs);
res.status(201).json(newBlog);
};

exports.getAllBlogs = (req, res) => {
  const blogs = getAllPosts();
  res.send(blogs);
};

exports.getBlog = (req, res) => { 
  const blogId = req.params.id;
  const blog = getAllPosts().find((blog) => blog.id == blogId);
  
  if (!blog) return res.status(404).json({ msg: "Blog not found" });
  res.status(200).json(blog);
}
exports.updatePost = (req, res) => { 
  let blogId = req.params.id;
  let {name,content}=req.body;
  let blogs = getAllPosts();
  let postIndex = blogs.findIndex((item) => item.id == blogId);
  if (postIndex === -1)
    return res.status(404).json({ msg: "No such blog found!" });
  console.log(blogs[postIndex]);
  if (name) {
    blogs[postIndex].name = name;
  }
  if (content) {
    blogs[postIndex].content = content;
  }
  createPost(blogs);
  res.status(200).json({ msg: "updated Successfully", blogs });

}

exports.delePost = (req, res) => {
  let blogId = req.params.id;
  let blogs = getAllPosts();
  let postIndex = blogs.findIndex((item) => item.id == blogId);
  if (postIndex === -1)
    return res.status(404).json({ msg: "No such blog found!" });
  console.log(blogs[postIndex]);
  // let removedBlog = blogs[postIndex];
  blogs.splice(postIndex, 1);
  createPost(blogs);
  res.status(200).json({ msg: "Deleted Successfully", blogs });
}
// app.delete("/products/:id", (req, res) => {
//   let productIndex = products.findIndex(
//     (product) => product.id == req.params.id
//   );
//   if (productIndex !== -1) {
//     products.splice(productIndex, 1);
//     fs.writeFileSync("data.json", JSON.stringify(products));
//     res.send("item deleted");
//   } else {
//     res.status(404).send("Product not found");
//   }
//   fs.writeFileSync("data.json", JSON.stringify(products));
// });
