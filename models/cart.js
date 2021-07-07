const Joi = require("joi");
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: new mongoose.Schema({
    title: {
      maxlength: 255,
      minlength: 5,
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    imageUrl: {
      type: String,
      minlength: 10,
      maxlength: 1255,
      required: true,
    },
  }),
  user: new mongoose.Schema({
    name: {
      maxlength: 30,
      minlength: 5,
      required: true,
      type: String,
    },
    email: {
      maxlength: 255,
      required: true,
      type: String,
    },
  }),
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

const validateOrders = (cart) => {
  const schema = Joi.object({
    productId: Joi.objectId().required().label("Product ID"),
    userId: Joi.objectId().required().label("User ID"),
    quantity: Joi.number(),
  });

  return schema.validate(cart);
};

module.exports.validate = validateOrders;
module.exports.Cart = Cart;
module.exports.cartSchema = cartSchema;
