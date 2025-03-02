const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  productTitle: String,
  productPrice: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
