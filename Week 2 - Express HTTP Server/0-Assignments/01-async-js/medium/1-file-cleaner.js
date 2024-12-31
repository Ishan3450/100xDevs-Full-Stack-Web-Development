const fs = require("fs");
const filePath = "Week 2/Assignments/01-async-js/medium/Text.txt";

fs.readFile(filePath, "utf-8", function (err, data) {
  const splitted = data.split(" ");
  let cleanedData = "";

  splitted.forEach(function (elem) {
    if (elem !== "") {
      cleanedData += `${elem} `;
    }
  });

  fs.writeFile(filePath, cleanedData.trim(), function (err) {
    if (err) {
      console.log(`Error -> ${err}`);
    } else {
      console.log("File cleaned !!");
    }
  });
});
