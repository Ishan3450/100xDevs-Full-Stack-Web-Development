import { client } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const insertQuery: string = "INSERT INTO users(username, password, name) VALUES ($1, $2, $3) RETURNING username, password, name";

    try {
        await client.connect();
        const res = await client.query(insertQuery, [username, password, name]);

        return res.rows[0];
    } catch (error) {
        return {};
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const query = "SELECT * FROM users WHERE id=$1";
    const response = await client.query(query, [userId]);

    return response.rows.length > 0 ? response.rows[0] : {};
}
