const express = require("express");
const router = express.Router();
const { validate, Order } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid Product");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const order = new Order({
    product: {
      title: product.title,
      price: product.price,
    },
    user: {
      name: user.name,
      email: user.email,
    },
    address: req.body.address,
    orderQuantity: req.body.orderQuantity,
    phone: req.body.phone,
  });

  try {
    new Fawn.Task()
      .save("orders", order)
      .update(
        "products",
        { _id: product._id },
        {
          $inc: { stock: -1 },
        }
      )
      .run();
    res.send(order);
  } catch (error) {
    // 500 Error is for Internal server error
    return res.status(500).send("Something Failed");
  }
});

module.exports = router;
