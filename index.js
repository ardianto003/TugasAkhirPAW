const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("./models/order.model.js");
const Book = require("./models/book.model.js");
const User = require("./models/user.model.js");
require("dotenv").config();

const app = express();

const mongo_uri = process.env.MONGO_URI;
const jwt_secret = process.env.JWT_SECRET;
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Connected to database.");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Database connection failed.");
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/semua-buku", async (req, res) => {
  try {
    const book = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
