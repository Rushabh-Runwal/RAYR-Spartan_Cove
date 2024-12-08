import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "../../models/Message.model.js";

dotenv.config({ path: ".env.test" });

jest.setTimeout(30000); // Set timeout to 20 seconds

describe("Message Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create and save a message successfully", async () => {
    const messageData = {
      sender: "user123",
      group: new mongoose.Types.ObjectId(),
      content: "Hello, this is a test message",
      messageType: "text",
    };

    const message = new Message(messageData);
    const savedMessage = await message.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.sender).toBe(messageData.sender);
    expect(savedMessage.content).toBe(messageData.content);
    expect(savedMessage.messageType).toBe(messageData.messageType);
  });

  test("should not save a message without required fields", async () => {
    const message = new Message({});

    try {
      await message.save();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.errors.sender).toBeDefined();
    }
  });
});