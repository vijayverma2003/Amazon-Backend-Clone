const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
});

const Category = mongoose.model("Categories", categorySchema);

function validateCategory(category) {
  schema = Joi.object({
    name: Joi.string().required().min(5).max(55).label("Name"),
  });

  const result = schema.validate(category);
  return result;
}

exports.validate = validateCategory;
exports.Category = Category;
