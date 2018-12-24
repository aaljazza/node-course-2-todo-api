var mongoose = require("mongoose");

mongoose.Promise = global.Promise; //just in server.js to configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp"
);

module.exports = { mongoose };
