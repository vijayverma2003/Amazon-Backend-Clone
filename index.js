const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categories = require("./routes/categories");

app.use(express.json());
app.use("/api/categories", categories);

mongoose
  .connect("mongodb://localhost/amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."));

const port = process.env.port || 3000;
app.listen(port, () => console.log("Connected to LocalHost: " + port));
