const express = require("express");
const validateToken = require("../middleware/validationHandler");
const {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactController");
const router = express.Router();

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
