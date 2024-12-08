import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../../server.js";
import Message from "../../models/Message.model.js";
import Group from "../../models/group.model.js";

dotenv.config({ path: ".env.test" });

jest.setTimeout(20000); // Set timeout to 20 seconds

describe("Message Controller Test", () => {
  let groupId;
  let senderId = "user123";

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const group = await Group.create({ name: "Test Group", participants: [senderId] });
    groupId = group._id;
  });

  afterAll(async () => {
    await Message.deleteMany({});
    await Group.deleteMany({});
    await mongoose.connection.close();
  });

  test("should create a new message in a group", async () => {
    const messageData = {
      sender: senderId,
      groupId,
      content: "This is a test message from the controller",
      messageType: "text",
    };

    const response = await request(app)
      .post("/messages")
      .set("Authorization", `Bearer YOUR_TEST_JWT_TOKEN`)
      .send(messageData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.content).toBe(messageData.content);
    expect(response.body.messageType).toBe(messageData.messageType);
  });
});
