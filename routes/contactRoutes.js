const express = require("express");
const {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
