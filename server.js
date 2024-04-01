const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const itemRoutes = require("./routes/itemRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/items", itemRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at port ${port}`));
