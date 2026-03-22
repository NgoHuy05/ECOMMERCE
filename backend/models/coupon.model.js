import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

  code: {
    type: String,
    required: true,
    unique: true
  },

  discount_type: {
    type: String,
    enum: ["percent", "fixed"],
    required: true
  },

  discount_value: {
    type: Number,
    required: true
  },

  min_order_value: {
    type: Number,
    default: 0
  },

  usage_limit: {
    type: Number,
    default: 0
  },

  used_count: {
    type: Number,
    default: 0
  },

  expires_at: {
    type: Date
  },

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  }

}, { timestamps: true });

couponSchema.index({ expires_at: 1 });

export default mongoose.model("Coupon", couponSchema);