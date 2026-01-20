const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema({
  resource_id: String,
  cloud: String,
  money_saved: Number,
  date: Date
});

module.exports = mongoose.model("Savings", SavingsSchema);
