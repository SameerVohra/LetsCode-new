const mongoose = require("mongoose");

const query = new mongoose.Schema({
  username: String,
  email: String,
  query: String,
  isResolved: Boolean,
});

const Query = mongoose.model("Query", query);
module.exports = Query;
