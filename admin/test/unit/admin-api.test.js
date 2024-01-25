import { expect } from "chai";
import request from "supertest";
import { connect } from "../../db.js"; // Update the path accordingly
import adminApp from "../../app.js"; // Update the path accordingly
import User from "../../models/user.js"; // Update the path accordingly
import Book from "../../models/book.js"; // Update the path accordingly

describe("Admin API - Integration Tests", () => {
  // Setup test environment (connect to database, etc.)
  before(async () => {
    await connect(); // Assuming you have a connect function in db.js
  });

  // Cleanup after tests (close database connection, etc.)
  after(async () => {
    // Close the database connection or perform any necessary cleanup
  });

  describe("POST /admin/books", () => {
    it("should add a new book to the catalog", async () => {
      const response = await request(adminApp).post("/admin/books").send({
        title: "Test Book",
        author: "Test Author",
        publisher: "Test Publisher",
        category: "Test Category",
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("_id");
      // Add more assertions based on your application's behavior
    });
  });

  describe("DELETE /admin/books/:id", () => {
    it("should remove a book from the catalog", async () => {
      // Assuming you have a book ID to test with
      const testBook = await Book.create({
        title: "Test Book",
        author: "Test Author",
      });

      const response = await request(adminApp).delete(
        `/admin/books/${testBook._id}`
      );

      expect(response.status).to.equal(200);
      expect(response.body)
        .to.have.property("_id")
        .equal(testBook._id.toString());
      // Add more assertions based on your application's behavior
    });
  });

  // Add more tests for other endpoints as needed
});
