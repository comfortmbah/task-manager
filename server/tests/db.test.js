import { describe, it, expect } from 'vitest';
import pool from '../config/db.js';

describe("Test database", () => {
  it("should connect to the test database", async () => {
    const result = await pool.query("SELECT current_database()");

    expect(result.rows[0].current_database).toBe("task_flow_test_db");
  })
})