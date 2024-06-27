import { Client } from "pg";
import * as dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL
});

async function getUsers(email: string){
    try {
        await client.connect();
        const selectQuery: string = "SELECT * FROM users WHERE email=$1";
        const result = await client.query(selectQuery, [email]);


        if(result.rows.length > 0){
            log(`Users found: `, result.rows[0]);
        } else {
            log("No users found");
        }

    } catch (error) {
        log("error " + error);
    } finally {
        await client.end();
    }
}

getUsers("user@gmail.com");
