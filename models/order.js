const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
  orderQuantity: {
    required: true,
    type: Number,
  },
  dateOut: {
    type: Date,
    default: new Date(),
    required: true,
  },
  dateShipped: {
    type: Date,
  },
  address: {
    maxlength: 255,
    minlength: 5,
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
});

const Order = mongoose.model("Orders", orderSchema);

const validateOrders = (order) => {
  const schema = Joi.object({
    address: Joi.string().required().min(5).max(255).label("Address"),
    orderQuantity: Joi.number().required().label("Order Quantity"),
    phone: Joi.number().required().label("Phone Number"),
    productId: Joi.objectId().required().label("Product ID"),
    userId: Joi.objectId().required().label("User ID"),
    dateShipped: Joi.date().label("Shipping Date"),
    dateOut: Joi.date().label("Date Out"),
  });

  return schema.validate(order);
};

module.exports.validate = validateOrders;
module.exports.Order = Order;
