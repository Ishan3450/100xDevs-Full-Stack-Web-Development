const bcrypt = require("bcrypt");

// * https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/#how-to-install-bcrypt-in-nodejs


async function getHashOfPassword(user_input_password){
    const saltRounds = 10; // 10 to 12

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(user_input_password, salt);
}

async function verifyPasswordWithHash(user_input_password, hashed_password){
    return await bcrypt.compare(user_input_password, hashed_password); // returns boolean value
}

getHashOfPassword("Ishan@99").then( (response) => {
    verifyPasswordWithHash("Ishan@99", response).then((r) => {
        console.log(r);
        if(r){
            console.log("Success");
        } else {
            console.log("Failed");
        }
    })
});