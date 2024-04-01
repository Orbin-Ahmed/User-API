const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

//@desc Get all items
//@route GET /api/items
//@access Public
const getItems = asyncHandler(async (req, res) => {
  const item = await Item.find();
  res.status(200).json(item);
});

//@desc Create item
//@route POST /api/items
//@access Public
const createItem = asyncHandler(async (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    res.status(400);
    throw new Error("All field is mendatory");
  }
  const item = await Item.create({
    name,
    quantity,
    price,
  });
  res.status(201).json({ message: `Item ${name} is created.` });
});

//@desc Get item by id
//@route GET /api/items/:id
//@access Public
const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  res.status(200).json(item);
});

//@desc Update item
//@route PUT /api/items
//@access Public
const updateItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedItem);
});

//@desc Update item
//@route PUT /api/items
//@access Public
const deleteItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  await Item.findByIdAndDelete(id);
  res.status(200).json(`Item ${item.name} deleted successfully`);
});

module.exports = {
  getItems,
  createItem,
  getItemById,
  updateItemById,
  deleteItemById,
};
