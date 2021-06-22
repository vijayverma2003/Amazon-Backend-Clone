const express = require("express");
const router = express.Router();

const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const products = await Product.find().sort("label");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const product = new Product({
    category: {
      _id: category._id,
      name: category.name,
    },
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    inWishList: req.body.inWishList,
    label: req.body.label,
    listPrice: req.body.listPrice,
    price: req.body.price,
    savedForLater: req.body.savedForLater,
    stock: req.body.stock,
    title: req.body.title,
    quantityInCart: req.body.quantityInCart,
  });
  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        categoryId: req.body.categoryId,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        inWishList: req.body.inWishList,
        label: req.body.label,
        listPrice: req.body.listPrice,
        price: req.body.price,
        savedForLater: req.body.savedForLater,
        stock: req.body.stock,
        title: req.body.title,
        quantityInCart: req.body.quantityInCart,
      },
    },
    { new: true }
  );

  if (!product) return res.status(400).send("Invalid Product");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(400).send("Invalid Product");

  res.send(product);
});

module.exports = router;
