// app.js
const express = require('express');
const amqp = require("amqplib");
const bodyParser = require('body-parser');
const db = require('./db');
const User = require('./models/user');
const Book = require('./models/book');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());




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

// Enroll a user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all available books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Filter books
app.get('/books', async (req, res) => {
  const { publisher, category } = req.query;
  try {
    const filteredBooks = await Book.find({ publisher, category, isAvailable: true });
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Borrow a book by ID
app.post('/books/:id/borrow', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || !book.isAvailable) {
      return res.status(404).json({ error: 'Book not available for borrowing' });
    }

    // Update book status and due date
    book.isAvailable = false;
    book.dueDate = new Date(Date.now() + req.body.days * 24 * 60 * 60 * 1000);
    await book.save();

    // Notify Admin API about the book update
    await sendUpdateMessage('bookBorrowed', book);

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Enroll a user
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List all available books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Filter books
app.get("/books", async (req, res) => {
  const { publisher, category } = req.query;
  try {
    const filteredBooks = await Book.find({
      publisher,
      category,
      isAvailable: true,
    });
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

