import pool from "../config/db.js";

export const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC")
  
  return result.rows;
};

export const createTask = async (text) => {
  const result = await pool.query(
    `INSERT INTO tasks (text)
     VALUES ($1)
     RETURNING *`,
    [text]
  );

  return result.rows[0];
}

export const updateTask = async (id, completed) => {
  const result = await pool.query(
    `UPDATE tasks
    SET completed = $1
    WHERE id = $2
    RETURNING *`,
    [completed, id]
  );

  return result.rows[0];
}

export const deleteTask = async (id) => {
  const result = await pool.query(
    `DELETE FROM tasks
    WHERE id = $1
    RETURNING *`,
    [id]
  );

  return result.rows[0];
}

export const deleteCompletedTask = async () => {
  await pool.query(
    `DELETE FROM tasks
    WHERE completed = true`
  );

  const result = await pool.query(
    `SELECT * FROM tasks
    ORDER BY id ASC`
  );

  return result.rows;
}

