const fs = require("fs");

fs.writeFile("Week 2/Assignments/01-async-js/easy/Text.txt", "This is written from the writeFile method", (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Written successfully !!");
    }
});