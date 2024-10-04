// * providing types to the arguement function
function greetUser(username: string){
    console.log(`Hello, ${username}`);
}
// * function with default value and types
function createUser(username: string, email: string, isPaid: boolean = false){}
// greetUser("Ishan");

// * returning some value function
function sum(num1: number, num2: number): number {
    return num1 + num2;
}
// console.log(sum(5,5));

function validUser(age: number): boolean {
    return age >= 18;
}

// * never returning type function must not be a normal function (see docs)
// never is used to end something or which will never be executed
function validUserNeverReturning(): never {
    throw new Error();
}

function validUserReturningVoid(age: number): void {}

// console.log(validUser(18));
// console.log(validUser(8));

// * function handling callback functions which returns void
function handleCallback(fn: () => void) { // () => string for the functions returning string or can place any type instead of string or void
    setTimeout(fn, 1000);
}

// handleCallback(function() {
//     console.log("This is a callback");
// });
