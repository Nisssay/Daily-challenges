const express = require("express");
const router = express.Router();
const controller = require('../controllers/postController');
const middleware = require('../middlewares/middlewares');


router.get('/posts/'  , middleware.sessionVerification, controller.getPosts );

router.post('/posts'  , middleware.sessionVerification, middleware.getBlogsValidationRules(),controller.postPosts);

router.put('/posts/:Id'  , middleware.sessionVerification, middleware.getBlogsValidationRules(),controller.updatePost);

router.delete('/posts/:Id'  , middleware.sessionVerification , controller.deletePost);

module.exports = router;