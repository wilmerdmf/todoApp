const request = require("supertest");
const app = require("../app");
const { connectDb, closeDb, clearDb } = require("./helpers/setupDb");
const { createTestUser, getAuthCookie } = require("./helpers/authHelper");
const Project = require("../models/Project");
const Card = require("../models/Card");

let user;
let cookie;

beforeAll(async () => {
  process.env.JWT_SECRET = "test_secret_key";
  process.env.FRONTEND_URL = "http://localhost:5173";
  await connectDb();
});

afterAll(async () => {
  await closeDb();
});

beforeEach(async () => {
  await clearDb();
  user = await createTestUser({ email: "wilmer@example.com" });
  cookie = getAuthCookie(user._id);
});

const createProject = async (overrides = {}) => {
  return await Project.create({
    projectName: "Test Project",
    userId: user._id,
    ...overrides,
  });
};

const createCard = async (projectId, overrides = {}) => {
  return await Card.create({
    title: "Test Card",
    userId: user._id,
    projectId,
    order: 0,
    ...overrides,
  });
};

describe("GET /api/projects", () => {
  it("should return all projects for the authenticated user", async () => {
    await createProject({ projectName: "Project A" });
    await createProject({ projectName: "Project B" });

    const res = await request(app).get("/api/projects").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });

  it("should not return projects from another user", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    await createProject({ userId: otherUser._id });

    const res = await request(app).get("/api/projects").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("should return 401 when not authenticated", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.status).toBe(401);
  });
});

describe("POST /api/projects", () => {
  it("should create a project with a valid name", async () => {
    const res = await request(app).post("/api/projects").set("Cookie", cookie).send({ projectName: "My Project" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.projectName).toBe("My Project");
  });

  it("should trim whitespace from the project name", async () => {
    const res = await request(app).post("/api/projects").set("Cookie", cookie).send({ projectName: "  Trimmed  " });

    expect(res.status).toBe(201);
    expect(res.body.data.projectName).toBe("Trimmed");
  });

  it("should return 409 when a project with the same name already exists", async () => {
    await createProject({ projectName: "Duplicate" });

    const res = await request(app).post("/api/projects").set("Cookie", cookie).send({ projectName: "Duplicate" });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("should be case-insensitive when checking for duplicate names", async () => {
    await createProject({ projectName: "Work" });

    const res = await request(app).post("/api/projects").set("Cookie", cookie).send({ projectName: "work" });

    expect(res.status).toBe(409);
  });

  it("should return 400 when project name is missing", async () => {
    const res = await request(app).post("/api/projects").set("Cookie", cookie).send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 when project name exceeds max length", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Cookie", cookie)
      .send({ projectName: "a".repeat(16) });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 when not authenticated", async () => {
    const res = await request(app).post("/api/projects").send({ projectName: "My Project" });

    expect(res.status).toBe(401);
  });
});

describe("DELETE /api/projects/:id", () => {
  it("should delete a project by id", async () => {
    const project = await createProject();

    const res = await request(app).delete(`/api/projects/${project._id}`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const deleted = await Project.findById(project._id);
    expect(deleted).toBeNull();
  });

  it("should return 404 when project does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).delete(`/api/projects/${fakeId}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });

  it("should not allow deleting another user's project", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    const project = await createProject({ userId: otherUser._id });

    const res = await request(app).delete(`/api/projects/${project._id}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });

  it("should return 422 when id format is invalid", async () => {
    const res = await request(app).delete("/api/projects/invalid-id").set("Cookie", cookie);

    expect(res.status).toBe(422);
  });
});

describe("DELETE /api/projects/:id/cards", () => {
  it("should delete the project and all its cards", async () => {
    const project = await createProject();
    await createCard(project._id);
    await createCard(project._id);

    const res = await request(app).delete(`/api/projects/${project._id}/cards`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data.cardsDeleted).toBe(2);

    const deletedProject = await Project.findById(project._id);
    const remainingCards = await Card.find({ projectId: project._id });
    expect(deletedProject).toBeNull();
    expect(remainingCards).toHaveLength(0);
  });

  it("should return 404 when project does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).delete(`/api/projects/${fakeId}/cards`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });
});

describe("PATCH /api/projects/:id/unassign", () => {
  it("should delete the project and unassign its cards", async () => {
    const project = await createProject();
    const card = await createCard(project._id);

    const res = await request(app).patch(`/api/projects/${project._id}/unassign`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data.cardsUnassigned).toBe(1);

    const deletedProject = await Project.findById(project._id);
    const unassignedCard = await Card.findById(card._id);
    expect(deletedProject).toBeNull();
    expect(unassignedCard.projectId).toBeNull();
  });

  it("should return 404 when project does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).patch(`/api/projects/${fakeId}/unassign`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });
});

describe("GET /api/projects/:id/cards/count", () => {
  it("should return the card count for a project", async () => {
    const project = await createProject();
    await createCard(project._id);
    await createCard(project._id);

    const res = await request(app).get(`/api/projects/${project._id}/cards/count`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data.count).toBe(2);
  });

  it("should return 0 when the project has no cards", async () => {
    const project = await createProject();

    const res = await request(app).get(`/api/projects/${project._id}/cards/count`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data.count).toBe(0);
  });
});
