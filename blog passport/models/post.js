
const fileHelper = require('../helpers/fileHelper');
const rmBlogId = Math.floor(Math.random() * 10000);

// async function getPostById(Id) {
//     try {
//        let data = await fileHelper.readDataFromFile("models/blog.json");
//        const post = data.find(x => x.Id = Id);
//        console.log(post);
//        return post;
//     } catch (error) {
//         throw new Error("Failed to read data from file.");
//     }  
// }

async function getAllPosts() {
        try {
           let data = await fileHelper.readDataFromFile("models/blog.json");
           return data;
        } catch (error) {
            throw new Error("Failed to read data from file.");
        }  
}


async function createPost(dataPost , userId){ // dataPost is the req.body and userId is the req.session.userId
    try {
    if(JSON.stringify(dataPost) != '{}'){
    let data = await getAllPosts();
    let blog = {
        Id : userId ,
        BlogId : rmBlogId,
        Title : dataPost.Title,
        Content : dataPost.Content
    }
    data.push(blog);
    const jsonData = JSON.stringify(data, null , 2);

    await fileHelper.writefile("models/blog.json" , jsonData , blog.BlogId , "created" );
    return true;
    }
    else{
        console.log("Request body is empty");
      return null;
    }
    }  
    catch (err){
      console.error("Error : ",err);
      return false;;
    }
}

async function updatePost(postData , userId , blogId){
    try {
    let data = await getAllPosts();
    const post = data.findIndex(x => x.Id == userId && x.BlogId == blogId);
    if(post !== -1){
        data[post].Title = postData.Title;
        data[post].Content = postData.Content;     
            const jsonData = JSON.stringify(data, null , 2);
            await fileHelper.writefile("models/blog.json" , jsonData , blogId , "updated" );
            return true;       
    }  
    else{
        console.log("There is no post with this Id");
        return null;
    }    
    }catch (error) {
        console.error("Error updating post:", error);
        return false;
    } 
}

async function deletePost(blogId , userId){
    try{
    let data = await getAllPosts();
    const postToDelete = data.findIndex(x => x.BlogId == blogId && x.Id == userId); 
    if (postToDelete === -1) {
        console.log("Post with ID", blogId, "not found.");
        return null; 
    }else{
        data.splice(postToDelete, 1);
        const jsonData = JSON.stringify(data, null , 2);
    
            await fileHelper.writefile("models/blog.json" , jsonData , blogId , "deleted" );
            return true; 
    } 
    }
    catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }        
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
}