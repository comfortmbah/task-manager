
import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../config/db.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      ["newuser@example.com"]
    );
  });

  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("newuser@example.com");
  });

  it("should return 400 when name, email, and password are missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Name, email and password are required",
    });
  });

  it("should return 400 when email is missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "New User",
        password: "password123",
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Name, email and password are required",
    });
  });

  it("should return 400 when password is missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "New User",
        email: "newuser@example.com",
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Name, email and password are required",
    });
  });

  it("should return 409 when email is already registered", async () => {
    await request(app)
      .post("/api/users")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      });

    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Another User",
        email: "newuser@example.com",
        password: "password456",
      });

    expect(response.status).toBe(409);

    expect(response.body).toEqual({
      message: "A user with this email already exist",
    });
  });
});
