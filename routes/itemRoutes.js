const express = require("express");
const validateToken = require("../middleware/validationHandler");
const router = express.Router();
const {
  getItems,
  createItem,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../controllers/itemController");

router.use(validateToken);

router.route("/").get(getItems).post(createItem);

router
  .route("/:id")
  .get(getItemById)
  .put(updateItemById)
  .delete(deleteItemById);

module.exports = router;
