import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import server from "../../server.js";
import Group from "../../models/group.model.js";

dotenv.config({ path: ".env.test" });

jest.setTimeout(30000); // Increase timeout to 30 seconds

describe("Group Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Close the server after tests
  });

  test("should get all groups", async () => {
    Group.find = jest.fn().mockResolvedValue([{ _id: "group1", name: "Test Group" }]);
    const res = await request(server).get("/group").set("Authorization", "Bearer valid_token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: "group1", name: "Test Group" }]);
  });

  test("should create a new group", async () => {
    const newGroup = { name: "New Group", participants: ["user123"] };
    Group.prototype.save = jest.fn().mockResolvedValue({ ...newGroup, _id: "group2" });

    const res = await request(server)
      .post("/group")
      .send(newGroup)
      .set("Authorization", "Bearer valid_token");

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGroup.name);
  });
});
