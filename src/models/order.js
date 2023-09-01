const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  custumer:{type:String},
  products: [
    {
      productId: { type: String},
      quantity: { type: Number, default: 1 },
    },
  ],
  amount: { type: Number},
  payment:{type:String, default:'online'},
  address: { type: String},
  status: { type: String, default: "pending" },
},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
