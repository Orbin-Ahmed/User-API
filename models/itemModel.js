const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please the item name"] },
    quantity: { type: Number, required: [true, "Please the item quantity"] },
    price: { type: Number, required: [true, "Please the item price"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
