import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String
  },

  sku: {
    type: String,
    required: true
  },

  attributes: {
    type: Map,
    of: String
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  subtotal: {
    type: Number,
    required: true
  }

}, { _id: false });


const orderSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [orderItemSchema],

  shipping_address: {
    name: String,
    phone: String,
    address: String,
    city: String,
    country: String
  },

  payment_method: {
    type: String,
    enum: ["cod", "vnpay", "momo"],
    required: true
  },

  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  order_status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "shipping",
      "delivered",
      "cancelled"
    ],
    default: "pending"
  },

  total_price: {
    type: Number,
    required: true
  }

}, { timestamps: true });

orderSchema.index({ user_id: 1 });
orderSchema.index({ order_status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;