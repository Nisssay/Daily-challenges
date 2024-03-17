const { getPosts , addPost , updatePost , deletePost} = require('../controllers/postController')
const postRouter = require('express').Router()
const verifyToken = require('../middlewares/authenticate')
postRouter.use(verifyToken)
postRouter.get('/',getPosts).post('/', addPost).patch('/:title', updatePost).delete('/', deletePost)

module.exports = postRouter