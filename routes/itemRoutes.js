const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../controllers/itemController");

router.route("/").get(getItems).post(createItem);

router
  .route("/:id")
  .get(getItemById)
  .put(updateItemById)
  .delete(deleteItemById);

module.exports = router;
