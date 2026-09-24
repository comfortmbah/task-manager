import { describe, it, expect } from 'vitest';
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/health/live", () => {
  it("should return 200 and status ok", async () => {
    const response = await request(app)
    .get("/api/health/live");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "ok",
    })
  })
})