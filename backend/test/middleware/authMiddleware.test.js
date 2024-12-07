import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import protect from "../../middleware/auth.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

jest.mock("../../models/user.model.js");

describe("Auth Middleware", () => {
  test("should call next if token is valid", async () => {
    const req = { headers: { authorization: "Bearer valid_token" } };
    const res = {};
    const next = jest.fn();
    jwt.decode = jest.fn().mockReturnValue({ user_id: "user123" });
    User.findById = jest.fn().mockResolvedValue({ _id: "user123", name: "John Doe" });
    await protect(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("should return 401 if token is missing", async () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await protect(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
