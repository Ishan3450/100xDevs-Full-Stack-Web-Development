interface TestUser {
    name: string,
    email: string,
    password: string,
    age: number
}

type Props = Pick<TestUser, 'name' | 'email' | 'age'> // picks the properties of User interface

function testFunction(props: Props){}