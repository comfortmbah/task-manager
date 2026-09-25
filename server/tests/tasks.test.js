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
      "DELETE FROM users WHERE email IN  ($1, $2)",
      ["task@example.com", "tobi1@gmail.com"]
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

  it("should only return tasks belonging to the authenticated user", async () => {
    const tobi1 = await createUser(
      "Tobi 1",
      "tobi1@gmail.com",
      "password123",
    );

    const login2 = await request(app)
    .post("/api/users/login")
    .send({
      email: "tobi1@gmail.com",
      password: "password123",
    });

    const token2 = login2.body.token;

    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token2}`)
    .send({ text: "Second user private tasks" });

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.tasks.some(
      (task) => task.text === "second user private task"
    )).toBe(false);
  })
});