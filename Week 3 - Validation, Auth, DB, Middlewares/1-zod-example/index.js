const zod = require("zod");

/* 
    zod to validate :
    {
        email: a proper email with @ and . in it
        password: min length 8
        transactions: type array with every element is of type number
        description: type array with every element is of type string
    }
*/
const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    transactions: zod.array(zod.number()),
    description: zod.array(zod.string())
});

function validateObject(obj){
    const response = schema.safeParse(obj);
    console.log(response);
}

validateObject({}) // output: { success: false, error: [Getter] }
validateObject({
    email: "test@gmail.com",
    password: "12312312313",
    transactions: [1,3,54,3,5,3,4],
    description: ["test"]
}) // output: success: true