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