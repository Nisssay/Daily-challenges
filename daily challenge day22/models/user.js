const fs = require("fs")

function getALLUsers() {
    let data = fs.readFileSync(
      "C:/Users/hp/Desktop/arkx/challenges/daily challenge day22/data.json"
    );
    return JSON.parse(data)
}

function createUser(data) {
    fs.writeFileSync(
      "C:/Users/hp/Desktop/arkx/challenges/daily challenge day22/data.json",
      JSON.stringify(data)
    );
}

module.exports = {getALLUsers,createUser}