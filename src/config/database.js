const mongoose = require("mongoose");
const config = require("./env");


mongoose.connect(config.databaseURI, { useNewUrlParser: true });
