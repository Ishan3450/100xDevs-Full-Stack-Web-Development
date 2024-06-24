import { Client } from "pg";
import * as dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL
});

async function insertData(username: string, email: string, password: string){
    try {
        await client.connect();
        const insertQuery: string = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const result = await client.query(insertQuery, [username, email, password]);

        log(result);
    } catch (error) {
        log(error);
    } finally {
        await client.end();
    }
}

insertData("username", "user@gmail.com", "username");
