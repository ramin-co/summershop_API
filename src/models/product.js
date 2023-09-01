const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required:true},
    catogeries: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: String, required: false },
    stock: { type: String, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
