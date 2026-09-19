import pool from "../../config/db.js";

export const getAllTasks = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks 
     WHERE user_id = $1
     ORDER BY id ASC`,
    [userId]
  );
  
  return result.rows;
};

export const createTask = async (text, userId) => {
  const result = await pool.query(
    `INSERT INTO tasks (text, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [text, userId]
  );

  return result.rows[0];
}

export const updateTask = async (id, completed, userId) => {
  const result = await pool.query(
    `UPDATE tasks
    SET completed = $1
    WHERE id = $2
    AND user_id = $3
    RETURNING *`,
    [completed, id, userId]
  );

  return result.rows[0];
}

export const deleteTask = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM tasks
    WHERE id = $1
    AND user_id = $2
    RETURNING *`,
    [id, userId]
  );

  return result.rows[0];
}

export const deleteCompletedTask = async (userId) => {
  await pool.query(
    `DELETE FROM tasks
    WHERE completed = true
    AND user_id = $1`,
    [userId]
  );

  const result = await pool.query(
    `SELECT * FROM tasks
    WHERE user_id = $1
    ORDER BY id ASC`,
    [userId]
  );

  return result.rows;
}

