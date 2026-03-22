import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    method: {
        type: String,
        enum: ["cod", "vnpay", "momo", "paypal"],
        required: true
    },

    transaction_id: String,

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    }

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);