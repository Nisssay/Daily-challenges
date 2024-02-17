const fs = require("fs")

function getAllPosts() {
    let data = fs.readFileSync("C:/Users/hp/Desktop/arkx/challenges/week challenge 2/data.json");
    return JSON.parse(data)
}

function createPost(data) {
    fs.writeFileSync("C:/Users/hp/Desktop/arkx/challenges/week challenge 2/data.json",JSON.stringify(data)
    );
}

module.exports = {getAllPosts,createPost}