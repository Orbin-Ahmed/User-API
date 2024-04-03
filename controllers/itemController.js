const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

//@desc Get all items
//@route GET /api/items
//@access Private
const getItems = asyncHandler(async (req, res) => {
  const item = await Item.find({ user_id: req.user.id });
  res.status(200).json(item);
});

//@desc Create item
//@route POST /api/items
//@access Private
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
    user_id: req.user.id,
  });
  res.status(201).json({ message: `Item ${name} is created.` });
});

//@desc Get item by id
//@route GET /api/items/:id
//@access Private
const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (item) {
    if (item.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }
    res.status(200).json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc Update item
//@route PUT /api/items
//@access Private
const updateItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (item) {
    if (item.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc Update item
//@route PUT /api/items
//@access Private
const deleteItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (item) {
    if (item.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }
    await Item.findByIdAndDelete(id);
    res.status(200).json(`Item ${item.name} deleted successfully`);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

module.exports = {
  getItems,
  createItem,
  getItemById,
  updateItemById,
  deleteItemById,
};
