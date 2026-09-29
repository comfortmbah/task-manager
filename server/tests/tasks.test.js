import { describe, it, expect, afterEach, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../config/db.js";
import { createUser } from "../src/models/userModel.js";
import { response, text } from "express";
import { resolve } from "dns";

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

  it("should create a task for the authenticated user", async () => {
    const response = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "My new taskflow task",
    });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      text: "My new taskflow task",
      completed: false,
      user_id: user.id,
    });
  });

  it("should return 400 when task text is missing", async () => {
    const response = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Task text must be a string",
    });
  });

  it("should return 400 when task text is blank", async () => {
    const response = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "   ",
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Task text is required",
    });
  });

  it("should return 401 when creating a task without authentication", async () => {
    const response = await request(app)
    .post("/api/tasks")
    .send({
      text: "Unauthorized task",
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Authentication required",
    });
  });

  it("should update a task for the authenticated user", async () => {
    const createResponse = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Task to update",
    });

    console.log("CREATE RESPONSE:", createResponse.body);

    const taskId = createResponse.body.id;

    const response = await request(app)
    .patch(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: taskId,
      text: "Task to update",
      completed: true,
      user_id: user.id,
    });
  });

  it("should return 404 when updating a task that does not exist", async () => {
    const response = await request(app)
    .patch("/api/tasks/888888")
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: "Task not found",
    });
  });

  it("should return 400 when task ID is invalid", async () => {
    const response = await request(app)
    .patch("/api/tasks/abc")
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Invalid task ID",
    });
  });

  it("should return 400 when completed is not a boolean", async () => {
    const createResponse = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Task validation test",
    });

    console.log("CREATE RESPONSE:", createResponse.body);

    const taskId = createResponse.body.id;

    const response = await request(app)
    .patch(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: "true",
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Completed must be a boolean",
    });
  });

  it("should delete a task for the authenticated user", async () => {
    const createResponse = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Task to delete",
    });

    const taskId = createResponse.body.id;

    const response = await request(app)
    .delete(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      message: "Task deleted successfully",
    });
  });

  it("should return 404 when deleting a task that does not exist", async () => {
    const response = await request(app)
    .delete("/api/tasks/999999")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: "Task not found",
    });
  });

  it("should return 404 when deleting another user's task", async () => {
    const user2 = await createUser(
      "another user",
      `another-${Date.now()}@example.com`,
      "password123",
    );

    const login2 = await request(app)
    .post("/api/users/login")
    .send({
      email: user2.email,
      password: "password123",
    });

    const token2 = login2.body.token;

    const createResponse = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token2}`)
    .send({
      text: "Second user's private task",
    });

    const taskId = createResponse.body.id;

    const response = await request(app)
    .delete(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: "Task not found",
    })
  })

  it("should return 400 when deleting a task with an invalid ID", async () => {
    const response = await request(app)
    .delete("/api/tasks/abc")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Invalid task ID",
    });
  });

  it ("should respect the pagination limit", async () => {
    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Pagination task 1"
    });

    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Pagination task 2"
    });

    const response = await request(app)
    .get("/api/tasks?limit=1")
    .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200);

    expect(response.body.tasks).toHaveLength(1);

    expect(response.body.pagination.limit).toBe(1);
  })

  it("should filter tasks by completed status", async () => {
    const firstTask = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Completed task",
    });

    const taskId = firstTask.body.id;

    await request(app)
    .patch(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Active task",
    });

    const response = await request(app)
    .get("/api/tasks?status=completed")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.tasks).toHaveLength(1);

    expect(response.body.tasks[0]).toMatchObject({
      text: "Completed task",
      completed: true,
    });
  });

  it("should search tasks by text", async () => {
    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Learn Testing",
    });

    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Go shopping",
    });

    const response = await request(app)
    .get("/api/tasks?search=Testing")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.tasks).toHaveLength(1);

    expect(response.body.tasks[0]).toMatchObject({
      text: "Learn Testing",
    });
  });

  it("should sort tasks by creation date", async () => {
    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Older task",
    });

    await new Promise((resolve) => setTimeout(resolve, 20));

    await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Newer task",
    });

    const response = await request(app)
    .get("/api/tasks?sort=created_at&order=desc")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.tasks[0].text).toBe("Newer task");

    expect(response.body.tasks[1].text).toBe("Older task");
  })
});



describe("DELETE /api/tasks/completed", () => {
  let token;

  beforeEach(async () => {
  const email = `user-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}@example.com`;
  const password = "password123";

  const registerResponse = await request(app)
    .post("/api/users")
    .send({
      name: "Test User",
      email,
      password,
    });

  console.log("REGISTER RESPONSE:", registerResponse.status, registerResponse.body);

  const loginResponse = await request(app)
    .post("/api/users/login")
    .send({
      email,
      password,
    });

  console.log("LOGIN RESPONSE:", loginResponse.status, loginResponse.body);

  token = loginResponse.body.token;
 });

  it("should delete all completed tasks for the authenticated user", async () => {
    const firstTask = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Completed task 1",
    });

    const secondTask = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Completed task 2",
    });

    await request(app)
    .patch(`/api/tasks/${firstTask.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    await request(app)
    .patch(`/api/tasks/${secondTask.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      completed: true,
    });

    const response = await request(app)
    .delete("/api/tasks/completed")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      message: "Completed tasks deleted successfully",
      deletedCount: 2,
    });
  });

  it("should only delete completed tasks belonging to the authenticated user", async () => {
    const secondUserEmail = `seconduser-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}@example.com`;

    const secondUser = await createUser(
      "second user",
      secondUserEmail,
      "password123",
    );

    const secondLogin = await request(app)
    .post("/api/users/login")
    .send({
      email: secondUserEmail,
      password: "password123",
    });

    const secondToken = secondLogin.body.token;

    const secondTask = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${secondToken}`)
    .send({
      text: "second user completed task"
    });

    await request(app)
    .patch(`/api/tasks/${secondTask.body.id}`)
    .set("Authorization", `Bearer ${secondToken}`)
    .send({
      completed: true,
    });

    const response = await request(app)
    .delete("/api/tasks/completed")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.deletedCount).toBe(0);

    const secondUserTasks = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${secondToken}`);

    expect(secondUserTasks.body.tasks).toHaveLength(1);

    expect(secondUserTasks.body.tasks[0].text).toBe("second user completed task");
  })
});