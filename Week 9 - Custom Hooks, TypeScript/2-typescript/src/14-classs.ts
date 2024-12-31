class User {
    email: string
    name: string
    city: string = ""
    
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }

    // * constructor overloading happens in different way in ts do check docs for that
}

const u = new User("t@t.com", "t");
console.log(u);
