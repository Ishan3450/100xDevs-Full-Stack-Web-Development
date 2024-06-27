import { client } from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const insertQuery = "INSERT INTO todos(userId, title, description) VALUES ($1, $2, $3) RETURNING title, description, done, id";

    try {
        await client.connect();
        const res = await client.query(insertQuery, [userId, title, description]);

        return res.rows[0];
    } catch (error) {
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const query: string = "UPDATE todos SET done=true WHERE id=$1 RETURNING title, description, done, id";

    try {
        await client.connect();
        const res = await client.query(query, [todoId]);
        
        return res.rows[0];
    } catch (error) {
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const query: string = "SELECT * FROM todos WHERE userId=$1";

    try {
        await client.connect();
        const res = await client.query(query, [userId]);
        
        return res.rows;
    } catch (error) {
        return [];
    }
}