import { describe, it, expect } from 'vitest';
import request from "supertest";
import app from "../src/app.js";

describe("JWT authentication", () => {
  it("should return 401 when authorization header is missing", async () => {
    const response = await request(app)
    .get("/api/tasks");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Authentication required"
    });
  });
});