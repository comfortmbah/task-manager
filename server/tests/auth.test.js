import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import request from "supertest";
import app from "../src/app.js";
import pool from "../config/db.js";
import { createUser } from '../src/models/userModel.js';

   

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createUser(
      "Test User",
      "testuser@example.com",
      "password123"
    );
  });

  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      ["testuser@example.com"]
    );
  });

  it("should return 400 when email and password are missing", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 when the password is incorrect ", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "testuser@example.com",
      password: "password999",
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });

  it("should return 401 when the email does not exist", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });

  it("should return 400 when email is missing", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({
      password: "password123",
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });

  it("should return 400 when password is missing", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "testuser@example.com",
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });
});