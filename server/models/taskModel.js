import pool from "../config/db.js";

export const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC")
  
  return result.rows;
};