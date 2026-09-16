import pool from "../../config/db.js";

export const healthCheck = async (req, res) => {
  await pool.query("SELECT 1");

  res.status(200).json({
    status: "ok",
    database: "connected",
  });
}

export const livenessCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
  });
}

export const readinessCheck = async (req, res) => {
  await pool.query("SELECT 1");

  res.status(200).json({
    status: "ready",
  });
}