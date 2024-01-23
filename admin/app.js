// admin-app.js
const amqp = require("amqplib");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const User = require("./models/user");
const Book = require("./models/book");

const adminApp = express();
const PORT = 4000;

adminApp.use(bodyParser.json());


// Add a new book to the catalog
adminApp.post('/admin/books', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    // Notify Client API about the new book
    await sendUpdateMessage('newBookAdded', newBook);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function sendUpdateMessage(action, data) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'libraryExchange';
    const routingKey = 'update';

    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({ action, data })));

    console.log(`Sent update message: ${action}`);
  } catch (error) {
    console.error('Error sending update message:', error);
  }
}



// Add a new book to the catalog
adminApp.post("/admin/books", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    // Notify Client API about the new book (using a message broker or WebSocket)

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove a book from the catalog
adminApp.delete("/admin/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // Notify Client API about the book removal (using a message broker or WebSocket)

    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch/List users enrolled in the library
adminApp.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch/List users and the books they have borrowed
adminApp.get("/admin/users/borrowed-books", async (req, res) => {
  try {
    const usersWithBorrowedBooks = await User.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "userId",
          as: "borrowedBooks",
        },
      },
    ]);

    res.json(usersWithBorrowedBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch/List the books that are not available for borrowing
adminApp.get("/admin/books/not-available", async (req, res) => {
  try {
    const notAvailableBooks = await Book.find({ isAvailable: false });

    res.json(notAvailableBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (rest of the code)

// Start the server
adminApp.listen(PORT, () => {
  console.log(`Admin API is running on http://localhost:${PORT}`);
});
