interface User {
    name: string,
    email: string,
    age: number
    gender?: string // * optional field
}

function isLegal(user: User): boolean{
    return user.age >= 18;
}

console.log(isLegal({
    name: "ishan",
    email: "test@gmail.com",
    age: 20
}));
