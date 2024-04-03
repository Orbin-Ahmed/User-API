const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send(
    'This is the main page, find the project details <a href="https://github.com/Orbin-Ahmed/user-API/">here</a>'
  );
});
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at port ${port}`));
