import pool from "../../config/db.js";
import bcrypt from "bcrypt"

export const createUser = async (name, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email`,
    [name, email, passwordHash]
  );

  return result.rows[0];
}

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users
    WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}