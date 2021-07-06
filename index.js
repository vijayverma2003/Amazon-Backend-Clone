const express = require("express");
const app = express();

require("./startUp/cors")(app);
require("express-async-errors");
require("./startUp/db")();
require("./startUp/logging")();
require("./startUp/routes")(app);
require("./startUp/config")();
require("./startUp/prod")(app);
require("./startUp/validation")();

const port = process.env.port || 3900;
app.listen(port, () => console.log("Connected to LocalHost: " + port));
