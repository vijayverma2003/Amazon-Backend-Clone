const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(400).send("Invalid Category ID");
  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );
  if (!category) return res.status(400).send("Invalid ID");
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete({ _id: req.params.id });
  if (!category) return res.status(400).send("Invalid ID");
  res.send(category);
});

module.exports = router;
