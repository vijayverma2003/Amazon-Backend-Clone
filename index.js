const express = require("express");
const app = express();

require("express-async-errors");
require("./startUp/db")();
require("./startUp/logging")();
require("./startUp/routes")(app);
require("./startUp/config")();
require("./startUp/prod")(app);
require("./startUp/validation")();

const port = process.env.port || 3000;
app.listen(port, () => console.log("Connected to LocalHost: " + port));
