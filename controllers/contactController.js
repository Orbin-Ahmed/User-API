const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create all contacts
//@route POST /api/contacts
//@access Public
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
  });
  res.status(201).json({ message: `Contact ${name} is created.` });
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access Public
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found !");
  }
  res.status(200).json(contact);
});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@access Public
const updateContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found !");
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access Public
const deleteContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found !");
  }
  await Contact.findByIdAndDelete(id);
  res.status(200).json(`Contact ${contact.name} deleted successfully.`);
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
