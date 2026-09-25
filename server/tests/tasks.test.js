import { describe, it, expect, afterEach, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../config/db.js";
import { createUser } from "../src/models/userModel.js";

describe("GET /api/tasks", () => {
  let user;
  let token;

  beforeEach(async () => {
    user = await createUser(
      "Task Test",
      "task@example.com",
      "password123",
    );

    const loginResponse = await request(app)
    .post("/api/users/login")
    .send({
      email: "task@example.com",
      password: "password123",
    });

    token = loginResponse.body.token;
  })

  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      ["task@example.com"]
    );
  });

  it("should return the authenticated user's tasks", async () => {
    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("tasks");

    expect(response.body).toHaveProperty("pagination");

    expect(Array.isArray(response.body.tasks)).toBe(true);
  });
});