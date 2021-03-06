const express = require("express");
const router = express.Router();

const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const products = await Product.find().sort("label");
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product");

  res.send(product);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const titleTags = req.body.title
    .toLowerCase()
    .split(" ")
    .filter((token) => {
      return token.trim() !== 0;
    });

  const descriptionTags = req.body.description
    .toLowerCase()
    .split(" ")
    .filter((token) => {
      return token.trim !== 0;
    });

  const product = new Product({
    by: req.body.by,
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
    tags: [...titleTags, ...descriptionTags],
  });
  await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product");

  let category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        _id: product._id,
        by: req.body.by,
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
        tags: product.tags,
      },
    },
    { new: true }
  );

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(400).send("Invalid Product");

  res.send(product);
});

module.exports = router;
