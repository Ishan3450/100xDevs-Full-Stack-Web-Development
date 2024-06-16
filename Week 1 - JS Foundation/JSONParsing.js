const obj = {
    name: "Ishan",
    gender: "Male"
}

console.log(obj);

const jsonStringify = JSON.stringify(obj); // convert the javacript object to the json syntax
console.log(jsonStringify);

const parsedFinal = JSON.parse(jsonStringify); // convert the json syntax string back to the javascript object
console.log(parsedFinal);
