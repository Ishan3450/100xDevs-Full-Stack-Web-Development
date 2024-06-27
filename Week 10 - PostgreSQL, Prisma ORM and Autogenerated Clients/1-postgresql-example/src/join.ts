import { Client } from "pg";
import * as dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL
});

async function getUsers(){
    try {
        await client.connect();
        const result = await client.query(`
            SELECT * FROM users JOIN addresses ON users.id = addresses.id WHERE users.id = 1
        `);

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

getUsers();
