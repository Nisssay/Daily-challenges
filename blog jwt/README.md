Blog Backend with Node.js and Express

This project is a simple blog backend built using Node.js and Express, with JSON files as the storage method. It implements CRUD operations for managing blog posts and includes custom middleware for logging, error handling, and JWT authentication to ensure that each user can only manipulate their own blogs.

Challenge Overview

Features

CRUD Operations: Create, Read, Update, and Delete blog posts.
Authentication and Authorization: JWT authentication to ensure that each user can only manipulate their own blogs.
Persistence: JSON file storage for data.
Middleware: Custom logging, error handling, and JWT verification middleware.

Project Setup

Step 1: Project Setup
Initialize a new Node.js project.
Install Express.
Install Nodemon for development.

Step 2: Basic Server Setup

Create an app.js file at the root of your project.
Set up a basic Express server in app.js.

Step 3: Implement MVC Architecture

Models:

Create a models folder. Inside, create post.js and login.js files to define the structure of blog posts and user login data, respectively, and functions to interact with the JSON files.
Views: Views are not utilized in this backend challenge.

Controllers:

Create a controllers folder. Inside, create postController.js and loginController.js files to handle the logic for CRUD operations on blog posts and user login, respectively.
Routes:

Create a routes folder. Inside, define routes in postRoutes.js and loginRoutes.js files for blog post and user login operations, respectively, and use Express Router.

Step 4: Implement CRUD Operations

In models/post.js, implement functions to read and write to the JSON file (e.g., getAllPosts, createPost, etc.).
In controllers/postController.js, use these model functions to handle requests and send responses.
Define routes in routes/postRoutes.js for each operation and link them to the appropriate controller functions.
Implement similar steps for user login functionality.

Step 5: Middleware

Logging Middleware: Create middleware that logs each request to the console including the method and the path.
Error Handling Middleware: Implement error-handling middleware to catch and respond to any errors within the app.
JWT Verification Middleware: Create middleware to verify JWT tokens for authenticated routes, ensuring that each user can only manipulate their own blogs.

Step 6: Testing your Application

Use Postman to test each of your routes and ensure they perform the expected CRUD operations.
Test your middleware to ensure proper logging, error handling, and JWT verification.

Deliverables

A GitHub repository containing my project code.
A README.md file documenting how to install, run, and test the application, including information about JWT authentication and authorization.

Conclusion

This challenge provides an opportunity to understand the basics of building a backend with Node.js and Express, implementing CRUD operations, handling user authentication and authorization with JWT, and organizing code using the MVC architecture. Happy coding!