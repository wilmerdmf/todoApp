const request = require("supertest");
const app = require("../app");
const { connectDb, closeDb, clearDb } = require("./helpers/setupDb");
const { createTestUser, getAuthCookie } = require("./helpers/authHelper");
const Card = require("../models/Card");
const Project = require("../models/Project");

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

const createCard = async (overrides = {}) => {
  return await Card.create({
    title: "Test Card",
    description: "Test description",
    priority: "Chill",
    date: "",
    userId: user._id,
    order: 0,
    ...overrides,
  });
};

describe("GET /api/cards", () => {
  it("should return all cards for the authenticated user", async () => {
    await createCard({ title: "Card One" });
    await createCard({ title: "Card Two", order: 1 });

    const res = await request(app).get("/api/cards").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });

  it("should not return cards from another user", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    await createCard({ userId: otherUser._id });

    const res = await request(app).get("/api/cards").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("should return 401 when not authenticated", async () => {
    const res = await request(app).get("/api/cards");

    expect(res.status).toBe(401);
  });
});

describe("GET /api/cards/:id", () => {
  it("should return a single card by id", async () => {
    const card = await createCard({ title: "My Card" });

    const res = await request(app).get(`/api/cards/${card._id}`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("My Card");
  });

  it("should return 404 when card does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).get(`/api/cards/${fakeId}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });

  it("should return 422 when id format is invalid", async () => {
    const res = await request(app).get("/api/cards/invalid-id").set("Cookie", cookie);

    expect(res.status).toBe(422);
  });

  it("should not return a card that belongs to another user", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    const card = await createCard({ userId: otherUser._id });

    const res = await request(app).get(`/api/cards/${card._id}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });
});

describe("POST /api/cards", () => {
  it("should create a card with valid data", async () => {
    const res = await request(app).post("/api/cards").set("Cookie", cookie).send({
      title: "New Card",
      description: "A description",
      priority: "Chill",
      date: "",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("New Card");
  });

  it("should create a card with only the required title field", async () => {
    const res = await request(app).post("/api/cards").set("Cookie", cookie).send({
      title: "Minimal Card",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Minimal Card");
    expect(res.body.data.priority).toBe("Chill");
  });

  it("should assign a card to a project", async () => {
    const project = await Project.create({
      projectName: "My Project",
      userId: user._id,
    });

    const res = await request(app).post("/api/cards").set("Cookie", cookie).send({
      title: "Card with project",
      projectId: project._id.toString(),
    });

    expect(res.status).toBe(201);
    expect(res.body.data.projectId).toBeDefined();
  });

  it("should return 400 when title is missing", async () => {
    const res = await request(app).post("/api/cards").set("Cookie", cookie).send({
      description: "No title here",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 when title exceeds max length", async () => {
    const res = await request(app)
      .post("/api/cards")
      .set("Cookie", cookie)
      .send({
        title: "a".repeat(23),
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 when not authenticated", async () => {
    const res = await request(app).post("/api/cards").send({ title: "Card" });

    expect(res.status).toBe(401);
  });
});

describe("PUT /api/cards/:id", () => {
  it("should update a card with valid data", async () => {
    const card = await createCard({ title: "Old Title" });

    const res = await request(app)
      .put(`/api/cards/${card._id}`)
      .set("Cookie", cookie)
      .send({ title: "New Title", priority: "Important" });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("New Title");
    expect(res.body.data.priority).toBe("Important");
  });

  it("should return 404 when card does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).put(`/api/cards/${fakeId}`).set("Cookie", cookie).send({ title: "Updated" });

    expect(res.status).toBe(404);
  });

  it("should not allow updating another user's card", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    const card = await createCard({ userId: otherUser._id });

    const res = await request(app).put(`/api/cards/${card._id}`).set("Cookie", cookie).send({ title: "Hacked" });

    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/cards/:id", () => {
  it("should delete a card by id", async () => {
    const card = await createCard();

    const res = await request(app).delete(`/api/cards/${card._id}`).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const deleted = await Card.findById(card._id);
    expect(deleted).toBeNull();
  });

  it("should return 404 when card does not exist", async () => {
    const fakeId = "64a1f2c3b4d5e6f7a8b9c0d1";

    const res = await request(app).delete(`/api/cards/${fakeId}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });

  it("should not allow deleting another user's card", async () => {
    const otherUser = await createTestUser({ email: "other@example.com" });
    const card = await createCard({ userId: otherUser._id });

    const res = await request(app).delete(`/api/cards/${card._id}`).set("Cookie", cookie);

    expect(res.status).toBe(404);
  });
});

describe("PATCH /api/cards/reorder", () => {
  it("should reorder cards successfully", async () => {
    const cardA = await createCard({ title: "A", order: 0 });
    const cardB = await createCard({ title: "B", order: 1 });

    const res = await request(app)
      .patch("/api/cards/reorder")
      .set("Cookie", cookie)
      .send({ orderedIds: [cardB._id.toString(), cardA._id.toString()] });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const updatedA = await Card.findById(cardA._id);
    const updatedB = await Card.findById(cardB._id);
    expect(updatedB.order).toBe(0);
    expect(updatedA.order).toBe(1);
  });

  it("should return 400 when orderedIds is empty", async () => {
    const res = await request(app).patch("/api/cards/reorder").set("Cookie", cookie).send({ orderedIds: [] });

    expect(res.status).toBe(400);
  });
});
