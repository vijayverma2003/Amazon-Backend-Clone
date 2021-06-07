const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const products = require("./routes/products");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/products", products);

mongoose
  .connect("mongodb://localhost/amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."));

const port = process.env.port || 3000;
app.listen(port, () => console.log("Connected to LocalHost: " + port));
