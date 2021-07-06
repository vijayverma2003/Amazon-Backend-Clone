const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().label("E-Mail").min(5).max(255).email(),
    password: Joi.string().required().label("Password").min(8).max(1024),
  });

  return schema.validate(req);
};

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid E-mail or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid E-mail or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
