const fs = require('fs');

const fileHelper = require('../helpers/fileHelper');

async function getAllUsers() {
    try {
       let data = await fileHelper.readDataFromFile("models/users.json");
       return data;
    } catch (error) {
        throw new Error("Failed to read data from file.");
    }  
}

async function getUserId(username , password) {
    try {
       const data = await fileHelper.readDataFromFile("models/users.json");
       const userIndex = data.findIndex(x => x.username == username && x.password == password);
       const userId = data[userIndex].Id;
       return userId;
    } catch (error) {
        throw new Error("Failed to read data from file.");
    }  
}

async function checkLogin(bodyData){
    let data = await getAllUsers();
    const user = data.findIndex(x => x.username == bodyData.username && x.password == bodyData.password);
    if(user !== -1){
        return data[user];
    }
    else{
        return false;
    }
}

async function createAccount(bodyData){
    try{
        if(bodyData != '{}'){
            console.log(bodyData);
        const { username , password} = bodyData;
        const data = await fileHelper.readDataFromFile("models/users.json");
        const user = {
            Id : data.length,
            username : username,
            password : password
        }
        data.push(user);
        let data2 = JSON.stringify(data , null , 2);

        await fileHelper.writefile("models/users.json", data2 , bodyData , "created");
        return true;
    }
    }catch (err){
        return false;
    }

}

module.exports = {
    getAllUsers,
    checkLogin,
    getUserId,
    createAccount
}
