import { describe, it, expect } from 'vitest';
import request from "supertest";
import app from "../src/app.js";
import jwt from "jsonwebtoken";

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
});