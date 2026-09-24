import { describe, it, expect } from 'vitest';
import request from "supertest";
import app from "../src/app.js";

describe("POST /api/users", () => {
  it("should return 400 when required fields are missing", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Name, email and password are required",
    });
  });

  it("should register a new user successfully", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
      name: "Test user",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(response.status).toBe(201);

    expect(response.body.user).toMatchObject({
      name: "Test user",
      email: "testuser@example.com",
    });

    expect(response.body.user).not.toHaveProperty("password_hash");

    expect(response.body).toHaveProperty("token");
  });
});

describe("POST /api/users/login", () => {
  it("should return 400 when email and password are missing", async () => {
    const response = await request(app)
    .post("/api/users/login")
    .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });
});