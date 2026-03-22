import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },

    provider: {
        type: String
    },

    tracking_number: {
        type: String
    },

    shipping_fee: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "pending",
            "picked",
            "shipping",
            "delivered",
            "returned"
        ],
        default: "pending"
    },

    shipped_at: Date,
    delivered_at: Date

}, { timestamps: true });

export default mongoose.model("Shipping", shippingSchema);