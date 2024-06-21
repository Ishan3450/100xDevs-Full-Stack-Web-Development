// * providing types to the arguement function
function greetUser(username: string){
    console.log(`Hello, ${username}`);
}
// greetUser("Ishan");

// * returning some value function
function sum(num1: number, num2: number): number {
    return num1 + num2;
}
// console.log(sum(5,5));

function validUser(age: number): boolean {
    if(age >= 18){
        return true;
    }
    return false;
}
// console.log(validUser(18));
// console.log(validUser(8));

// * function handling callback functions which returns void
function handleCallback(fn: () => void) {
    setTimeout(fn, 1000);
}

// handleCallback(function() {
//     console.log("This is a callback");
// });

