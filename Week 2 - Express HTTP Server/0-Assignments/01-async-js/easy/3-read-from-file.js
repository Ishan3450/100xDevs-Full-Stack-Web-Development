const fs = require("fs");

fs.readFile("Week 2/Assignments/01-async-js/easy/Text.txt", "utf-8", function(err, data) {
    console.log(data);
})

const beforeTime = new Date().getTime();
for(let i = 0 ; i < 10000000000 ; i ++){}
console.log(`Printing the data after ${(new Date().getTime() - beforeTime)/1000} seconds`);

