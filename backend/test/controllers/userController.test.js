import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import request from "supertest";
import app from "../../server.js";
import User from "../../models/user.model.js";

jest.mock("../../models/user.model.js");

describe("User Controller", () => {
  test("should get all users", async () => {
    User.find = jest.fn().mockResolvedValue([{ _id: "user1", name: "John Doe" }]);
    const res = await request(app).get("/users").set("Authorization", "Bearer valid_token");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: "user1", name: "John Doe" }]);
  });

  test("should upsert a user", async () => {
    const userData = {
      uid: "12345",
      name: "Jane Doe",
      email: "jane@sjsu.edu",
    };
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue(userData);

    const res = await request(app).post("/users").send(userData);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Jane Doe");
  });
});
