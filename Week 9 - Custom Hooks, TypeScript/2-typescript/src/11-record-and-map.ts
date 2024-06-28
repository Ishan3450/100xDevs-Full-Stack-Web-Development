type tUser = {
    name: string,
    password: string
}

// way 1 : slightly ugly syntax
// type tUsers = {
//     [key: string] : tUser
// }

// better way
type tUsers = Record<string, tUser>;

const users: tUsers = {
    "somemail@domain.com": {
        name: "heii",
        password: "noheii"
    },
    "somemail2@domain.com": {
        name: "heii",
        password: "noheii"
    }

}

// ***********************

// Map

const usersMap = new Map<String, tUser>();

usersMap.set("something", {name: "t", password: "p"});
console.log(usersMap.get("something"));