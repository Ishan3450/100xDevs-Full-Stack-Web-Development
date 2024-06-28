interface UserEnt {
    readonly name: string,
    readonly age: number
}

const user: UserEnt = {
    name: "test",
    age: 20
}

// user.name = "another test" // this should give error as UserEnt.name is readonly property

/* 
    ANOTHER WAY
*/

interface UserEnt2 {
    name: string,
    age: number
}

const anotherWay: Readonly<UserEnt2> = {
    name: "test",
    age: 20
}