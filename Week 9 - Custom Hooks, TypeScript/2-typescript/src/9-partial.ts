interface TestUser {
    name: string,
    email: string,
    password: string,
    age: number
}

type TestUserProps = Pick<TestUser, 'name' | 'email' | 'age'> // picks the properties of User interface

type PartialProps = Partial<TestUserProps>; // makes ther UserProps' properties optional

function testFunction2(props: PartialProps){}