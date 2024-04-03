const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create all contacts
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }
  const contact = Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: `Contact ${name} is created.` });
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access Private
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact) {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found !");
  }
});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@access Private
const updateContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact) {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedContact);
  } else {
    res.status(404);
    throw new Error("Contact not found !");
  }
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access Private
const deleteContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact) {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission for this operation!");
    }

    await Contact.findByIdAndDelete(id);
    res.status(200).json(`Contact ${contact.name} deleted successfully.`);
  } else {
    res.status(404);
    throw new Error("Contact not found !");
  }
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
