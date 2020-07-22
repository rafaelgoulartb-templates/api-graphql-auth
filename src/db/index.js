const mongoose = require("mongoose");

mongoose.connect("db_url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
