const express = require("express");
const error = require("../middleware/error");
const categories = require("./routes/categories");
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const auth = require("./routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/orders", orders);
  app.use("/api/auth", auth);
  app.use(error);
};
