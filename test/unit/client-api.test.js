const { expect } = require("chai");
const request = require("supertest");
const setupTestEnvironment = require("../utils/setup");
const app = require("../../app"); // Update the path accordingly
const User = require("../../models/user");
const Book = require("../../models/book");

describe("Client API - Unit Tests", () => {
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
