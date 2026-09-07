import pool from "./config/db.js";

const result = await pool.query("SELECT * FROM tasks");

console.log(result.rows);

await pool.end();