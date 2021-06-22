const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

const categories = require("./routes/categories");
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const auth = require("./routes/auth");

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/auth", auth);

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}

mongoose
  .connect("mongodb://localhost/amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."));

const port = process.env.port || 3000;
app.listen(port, () => console.log("Connected to LocalHost: " + port));
