const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    maxlength: 55,
    minlength: 5,
    required: true,
    type: String,
  },
});

const Category = mongoose.model("Categories", categorySchema);

function validateCategory(category) {
  schema = Joi.object({
    name: Joi.string().required().min(5).max(55).label("Name"),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateCategory;
