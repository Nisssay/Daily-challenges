const router = require('express').Router();
const {addBlog,getAllBlogs,getBlog,delePost,updatePost} = require("../controllers/postController")


router.get("/", getAllBlogs);
router.get("/:id",getBlog)
router.post("/", addBlog)
router.put( "/:id" , updatePost )  
router.delete("/:id", delePost);



module.exports = router