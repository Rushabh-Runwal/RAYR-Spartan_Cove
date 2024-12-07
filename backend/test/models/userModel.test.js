import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import User from "../../models/user.model.js";

describe("User Model", () => {
  test("should create a new user", () => {
    const user = new User({ _id: "user123", name: "Jane Doe", email: "jane@sjsu.edu" });
    expect(user.name).toBe("Jane Doe");
    expect(user.email).toBe("jane@sjsu.edu");
  });
});
