import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import Group from "../../models/group.model.js";

describe("Group Model", () => {
  test("should create a new group", () => {
    const group = new Group({ name: "Study Group", admin: "admin123" });
    expect(group.name).toBe("Study Group");
    expect(group.admin).toBe("admin123");
  });
});
