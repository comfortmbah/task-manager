import { describe, it, expect, afterEach } from 'vitest';
import request from "supertest";
import app from "../src/app.js";
import jwt from "jsonwebtoken";
import pool from '../config/db.js';

describe("JWT authentication", () => {
  it("should return 401 when authorization header is missing", async () => {
    const response = await request(app)
    .get("/api/tasks");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Authentication required"
    });
  });

  it("should return 401 when authorization header is invalid", async () => {
    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", "InvalidToken")

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid authorization header"
    });
  });

  it("should return 401 when the token is invalid", async () => {
    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", "Bearer invalidtoken")

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid or expired token"
    });
  });

  it("should allow access with a valid JWT", async () => {
    const token = jwt.sign(
      { userId: 1 },
      process.env.JWT_SECRET
    );

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).not.toBe(401);
  })

  it("should return 401 when the token is expired", async () => {
    const token = jwt.sign(
      { userId: 1 },
      process.env.JWT_SECRET,
      { expiresIn: "-1s" }
    );

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid or expired token"
    })
  })

  it("should return 401 when the token was signed with the wrong secret", async () => {
    const token = jwt.sign(
      { userId: 1 },
      "wrong-secret"
    );

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid or expired token"
    })
  })

  it("should return 401 when bearer scheme is missing", async () => {
    const token = jwt.sign(
      { userId: 1 },
      process.env.JWT_SECRET
    );

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", token);

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid authorization header"
    })
  })

  it("should allow an authenticated user to access protected routes", async () => {
    await request(app)
    .post("/api/users")
    .send({
      name: "Tobi Amusan",
      email: "tobi@example.com",
      password: "password321",
    });

    const loginResponse = await request(app)
    .post("/api/users/login")
    .send({
      email: "tobi@example.com",
      password: "password321",
    });

    const token = loginResponse.body.token;

    const response = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`)


    expect(response.status).toBe(200);
  });

  it("should return the current user with a valid jwt", async () => {
    await request(app)
    .post("/api/users")
    .send({
      name: "sunday",
      email: "sunday@example.com",
      password: "password123",
    });

    const loginResponse = await request(app)
    .post("/api/users/login")
    .send({
      email: "sunday@example.com",
      password: "password123",
    });

    const token = loginResponse.body.token;

    const response = await request(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer ${token}`)


    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      user: {
        id: expect.any(Number),
        name: "sunday",
        email: "sunday@example.com",
      },
    })
  });

  afterEach(async () => {
    await pool.query(`
      DELETE FROM users
      WHERE email IN ($1, $2)`,
      ["tobi@example.com", "sunday@example.com"]
    )
  })
  
  it("should return 404 when the authenticated user no longer exists", async () => {
    const token = jwt.sign(
      { userId: 999999 },
      process.env.JWT_SECRET
    );

    const response = await request(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: "User not found",
    })
  })
});