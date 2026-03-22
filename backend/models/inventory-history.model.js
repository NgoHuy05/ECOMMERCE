import mongoose from "mongoose";

const inventoryHistorySchema = new mongoose.Schema({

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  sku: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: [
      "order",
      "restock",
      "admin_update",
      "refund",
      "cancel_order"
    ],
    required: true
  },

  quantity_change: {
    type: Number,
    required: true
  },

  stock_before: {
    type: Number,
    required: true
  },

  stock_after: {
    type: Number,
    required: true
  },

  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  note: String

}, { timestamps: true });


inventoryHistorySchema.index({ product_id: 1 });
inventoryHistorySchema.index({ sku: 1 });
inventoryHistorySchema.index({ createdAt: -1 });

const InventoryHistory = mongoose.model("InventoryHistory", inventoryHistorySchema);

export default InventoryHistory;