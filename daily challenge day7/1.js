const fetchUserData = async () => {
    try {
        const data = await fetch("https://dummyjson.com/users");
        const result = await data.json();
        // console.log(result["users"]);
        // console.log("######################")
        // console.log(result.length)
        return result;
        // const result = await  data.json();
    }catch (error) {
     console.log('FATAL ERROR: ', error.message)
    } 
}

const x = fetchUserData();
x.then(result => {
    // console.log(result);
    processUserData(result);
    summarizeAge(result);
}).catch(error => {
    console.log('Error occurred: ', error.message);
});


const processUserData = async (data) =>  {

    const userNameList = data["users"].filter(x => x.gender == 'male');
    // console.log(userNameList.length);
    // const nameAndAge = userNameList.map(x => `Name: ${x.firstName} ${x.lastName}, Age: ${x.age}`);
    const nameAndAge = userNameList.map(x => {
        const { firstName, lastName, age } = x;
        return  `Name: ${firstName} ${lastName}, Age: ${age // const destructedList = [];

    // for (let i = 0; i < userNameList.length; i++){
    //     const { id, firstName, lastName, age, gender, email, phone } = userNameList[i];    
    //     destructedList.push({id, firstName, lastName, age, gender, email, phone});
    // }
}`});

    console.log("Processed Users:")
    for (const user of nameAndAge) {
        console.log(`${user}`);
    }
    // console.log(nameAndAge);


   
    // console.log(destructedList)
}
const summarizeAge = (data) => {
    const userNameList = data["users"].filter(x => x.gender == 'male');
    const ages = userNameList.reduce((acc,x) => acc + Number(x.age),0);
    console.log("Total Age of Active Users:" + ages);
}

