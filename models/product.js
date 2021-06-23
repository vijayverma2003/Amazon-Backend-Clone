const mongoose = require("mongoose");
const Joi = require("joi");

const { categorySchema } = require("./category");

const productSchema = new mongoose.Schema({
  label: {
    maxlength: 50,
    minlength: 5,
    required: true,
    type: String,
  },
  title: {
    maxlength: 255,
    minlength: 5,
    required: true,
    type: String,
  },
  imageUrl: {
    type: String,
    minlength: 10,
    maxlength: 1255,
    required: true,
  },
  price: {
    required: true,
    type: Number,
  },
  listPrice: {
    type: Number,
  },
  category: {
    required: true,
    type: categorySchema,
  },
  stock: {
    required: true,
    type: Number,
  },
  description: {
    maxlength: 4000,
    minlength: 50,
    required: true,
    type: String,
  },
  savedForLater: {
    default: false,
    type: Boolean,
  },
  inWishList: {
    default: false,
    type: Boolean,
  },
  quantityInCart: {
    default: 0,
    max: 999,
    type: Number,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("Products", productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    categoryId: Joi.objectId().required(),
    description: Joi.string().min(50).max(4000).required(),
    imageUrl: Joi.string().min(10).max(1255).required(),
    inWishList: Joi.boolean(),
    label: Joi.string().required().min(5).max(50),
    listPrice: Joi.number(),
    price: Joi.number().required(),
    quantityInCart: Joi.number().max(999),
    savedForLater: Joi.boolean(),
    stock: Joi.number().required(),
    title: Joi.string().required().min(5).max(255),
  });
  return schema.validate(product);
};

exports.Product = Product;
exports.validate = validateProduct;
