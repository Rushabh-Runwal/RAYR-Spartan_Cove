import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import mongoose from "mongoose";
import { connectDB } from '../../config/db.js';

describe("Database Connection", () => {
  beforeAll(async () => {
    process.env.MONGO_URI = "mongodb://localhost/testdb";
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should connect to the database", async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
