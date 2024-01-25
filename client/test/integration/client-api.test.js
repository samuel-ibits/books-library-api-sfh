// test/integration/client-api.test.js
import { expect } from "chai";
import request from "supertest";
import setupTestEnvironment from "../utils/setup.js";
import app from "../../app.js"; // Update the path accordingly
// import User from "../../models/user.js";
// import Book from "../../models/book.js";

describe("Client API - Integration Tests", () => {
  setupTestEnvironment();

  describe("POST /users", () => {
    it("should enroll a new user", async () => {
      const response = await request(app).post("/users").send({
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("_id");
      expect(response.body.email).to.equal("test@example.com");
      expect(response.body.firstName).to.equal("John");
      expect(response.body.lastName).to.equal("Doe");
    });
  });

  // Add similar tests for other endpoints (GET /books, GET /books/:id, etc.)
});
