const model = require('../models/post');


const getPosts = async (req,res,next) =>{
  try {
    const posts = await model.getAllPosts();
    if (posts) {
        res.send(posts.filter(x => x.Id == req.user.Id)); // only show the user his own blogs
    } else {
        const err = new Error('There are no blogs available');
        err.statusCode = 404;
        throw err;
    }
   } catch (err){
    next(err);
} 
}
const postPosts = async (req,res,next) =>{
  try {
    let success = await model.createPost(req.body , req.user.Id);
    if(success === true){
      res.send(`"The blog was created successfully' `);
    }
    else if (success === null) {
      res.send("Request body is empty");
  } else {
      const err = new Error('Error writing file');
      err.statusCode = 404;
      next(err);
  }
  }catch (err){
      next(err);
  } 
}

const updatePost = async (req,res,next) =>{
  try{
   let success = await model.updatePost(req.body , req.user.Id , req.params.Id);
   if(success){
    res.send(`"Blog with the id of : " ${req.params.Id} 'was updated successfully' `);
  }
  else if (success === null ){
    const err = new Error(`There is no blog with the id of : ${req.params.Id}`);
    err.statusCode = 404;
    next(err);      
  }else{
    const err = new Error('There was an error while trying to update the file');
    err.statusCode = 404;
    next(err); 
  }   
  }
  catch (err){
   next(err);
  }  
}

const deletePost = async (req,res,next) =>{
  try{
    console.log(req.user.Id);
    console.log(req.params.Id);
    let success = await model.deletePost(req.params.Id , req.user.Id);
    if(success){
      res.send(`Blog with the id of : " ${req.params.Id} 'was deleted successfully`);
    }
    else if(success === null){
      const err = new Error(`There is no blog with the id of : ${req.params.Id}`);
      err.statusCode = 404;
      next(err);
    }
    else {
    const err = new Error('There was an error trying to delete the blog ');
    err.statusCode = 404;
    next(err);
  }
  }
  catch{
    const err = new Error(`There is no blog with the id of : ${req.params.Id}`);
    err.statusCode = 404;
    next(err);
  }
}


module.exports = {
    getPosts,
    postPosts,
    updatePost,
    deletePost
}