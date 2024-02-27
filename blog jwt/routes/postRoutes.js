const express = require("express");
const router = express.Router();
const controller = require('../controllers/postController');
const middleware = require('../middlewares/middlewares');


router.get('/posts/' , middleware.verifyToken , controller.getPosts );

router.post('/posts' , middleware.verifyToken , controller.postPosts);

router.put('/posts/:Id' , middleware.verifyToken , controller.updatePost);

router.delete('/posts/:Id'  , middleware.verifyToken , controller.deletePost);

module.exports = router;