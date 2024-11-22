const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: [true, "Please enter userId"],
  },
  bookId: {
    type: ObjectId,
    ref: "Book",
    required: [true, "Please enter bookId"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter amount of book"],
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
