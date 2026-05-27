const request = require("supertest");
const app = require("../app");
const { connectDb, closeDb, clearDb } = require("./helpers/setupDb");
const { createTestUser, getAuthCookie } = require("./helpers/authHelper");

beforeAll(async () => {
  process.env.JWT_SECRET = "test_secret_key";
  process.env.FRONTEND_URL = "http://localhost:5173";
  await connectDb();
});

afterAll(async () => {
  await closeDb();
});

afterEach(async () => {
  await clearDb();
});

describe("POST /api/auth/register", () => {
  it("should register a new user and return user data", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Wilmer",
      email: "wilmer@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe("wilmer@example.com");
    expect(res.body.user.password).toBeUndefined();
  });

  it("should set an HttpOnly cookie on register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Wilmer",
      email: "wilmer@example.com",
      password: "password123",
    });

    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/HttpOnly/i);
  });

  it("should return 400 when email is already in use", async () => {
    await createTestUser({ email: "wilmer@example.com" });

    const res = await request(app).post("/api/auth/register").send({
      name: "Wilmer",
      email: "wilmer@example.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "wilmer@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/auth/login", () => {
  it("should login with valid credentials", async () => {
    await createTestUser({ email: "wilmer@example.com", password: "password123" });

    const res = await request(app).post("/api/auth/login").send({
      email: "wilmer@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe("wilmer@example.com");
  });

  it("should return 401 with wrong password", async () => {
    await createTestUser({ email: "wilmer@example.com", password: "password123" });

    const res = await request(app).post("/api/auth/login").send({
      email: "wilmer@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 with non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nobody@example.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 when fields are missing", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wilmer@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/auth/logout", () => {
  it("should logout and clear the cookie", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"][0]).toMatch(/token=;/);
  });
});

describe("GET /api/auth/me", () => {
  it("should return current user when authenticated", async () => {
    const user = await createTestUser({ email: "wilmer@example.com" });
    const cookie = getAuthCookie(user._id);

    const res = await request(app).get("/api/auth/me").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe("wilmer@example.com");
  });

  it("should return 401 when not authenticated", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 with an invalid token", async () => {
    const res = await request(app).get("/api/auth/me").set("Cookie", "token=invalidtoken");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
