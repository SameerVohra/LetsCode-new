const mongoose = require("mongoose");

const questions = new mongoose.Schema({
  quesName: String,
  difficulty: String,
  description: String,
  constraints: [String],
});

const Ques = mongoose.model("Ques", questions);
module.exports = Ques;
