type Person = {
    name: string,
    email: string,
    age: number
    gender?: string // * optional field
}

function isLegal2(user: Person): boolean{
    return user.age >= 18;
}

console.log(isLegal2({
    name: "ishan",
    email: "test@gmail.com",
    age: 20
}));
// * Almost same as interface but lets you do few extra things


// * union
type GreetArg = number | string | boolean;
function greet2(msg: GreetArg): void{}

// * intersection
type Employee = {
    name: string,
    department: string,
    salary: number
};

type Manager = {
    name: string, 
    startDate: string,
    projectsCount: number
}

type TechLead = Employee & Manager;

const test: TechLead = {
    name: "Ishan",
    department: "Computer",
    salary: 50500000,
    startDate: "1-1-25",
    projectsCount: 5
}

