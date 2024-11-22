const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter book's title"],
  },
  author: {
    type: String,
    required: [true, "Please enter book's author"],
  },
  description: {
    type: String,
    required: [true, "Please enter book description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter book price"],
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
