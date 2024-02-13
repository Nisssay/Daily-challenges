const fs = require("fs")

function getAllPosts() {
    let data = fs.readFileSync('posts.json')
    return JSON.parse(data)
}

function createPost(post) {
    let data = getAllPosts()
    data.push(post)
    fs.writeFileSync('posts.json', JSON.stringify(data))
}