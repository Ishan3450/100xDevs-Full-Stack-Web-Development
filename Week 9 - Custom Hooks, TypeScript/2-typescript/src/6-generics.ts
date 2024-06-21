function identity<T>(arg: T): T{
    return arg;
}

console.log(identity<string>("test message"));
// or
console.log(identity("test message"));


console.log(identity<number>(100));
// or
console.log(identity(100));