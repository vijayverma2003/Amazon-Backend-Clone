const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/amazon", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to MongoDB..."));
};
