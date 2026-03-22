import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  sku: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  }

}, { _id: false });


const cartSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  items: [cartItemSchema]

}, { timestamps: true });

cartSchema.index({ user_id: 1 });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;