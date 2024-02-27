const express = require("express");
const router = express.Router();
const controller = require('../controllers/postController');
const middleware = require('../middlewares/middlewares');
const isAuth = require('../middlewares/strategyVerification');

router.use(isAuth);

router.get('/posts/'  , controller.getPosts );

router.post('/posts'  , middleware.getBlogsValidationRules(),controller.postPosts);

router.put('/posts/:Id'  , middleware.getBlogsValidationRules(),controller.updatePost);

router.delete('/posts/:Id'  , controller.deletePost);

module.exports = router;