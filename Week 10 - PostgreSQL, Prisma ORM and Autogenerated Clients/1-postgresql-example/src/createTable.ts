import { Client } from "pg";
import * as dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL
});

async function createUserTable(){
    try {
        await client.connect();
        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
    
        // const result = await client.query(`
        //     DROP TABLE users
        // `);
        log(result);    
    } catch (error) {
        log(`error: ${error}`)
    } finally {
        await client.end();
    }
}

createUserTable();
