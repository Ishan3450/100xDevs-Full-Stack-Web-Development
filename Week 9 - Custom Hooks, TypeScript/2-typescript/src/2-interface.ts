interface User {
    name: string,
    email: string,
    age: number
    gender?: string // * optional field
}

// kind of inheritence
interface Admin extends User { }
interface Admin2 extends Admin, User { }

function isLegal(user: User): boolean {
    return user.age >= 18;
}

console.log(isLegal({
    name: "ishan",
    email: "test@gmail.com",
    age: 20
}));
