const express = require("express");
const router = express.Router();
const { validate, Cart } = require("../models/cart");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const cartProducts = await Cart.find();
  res.send(cartProducts);
});

router.get("/:id", async (req, res) => {
  const cartProduct = await Cart.findById(req.params.id);
  if (!cartProduct) return res.status(400).send("Invalid Cart Product");
  res.send(cartProduct);
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid Product");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const cartProduct = await Cart.updateOne(
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      product: {
        _id: product._id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
      },
    },
    {
      $set: {
        product: {
          _id: product._id,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
        },
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      $inc: { quantity: 1 },
    },
    {
      new: true,
      upsert: true,
    }
  );
  res.send(cartProduct);
});

// res.send(cartProduct);

router.delete("/:id", async (req, res) => {
  let cartProduct = await Cart.findById({ _id: req.params.id });
  if (!cartProduct) return res.status(400).send("Invalid Cart ProductID");

  cartProduct = await Cart.findByIdAndDelete(req.params.id);

  res.send(cartProduct);
});

module.exports = router;
