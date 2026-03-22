import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String },
    is_default: { type: Boolean, default: false }
}, { timestamps: true }
);
addressSchema.index(
 { user_id: 1, is_default: 1 },
 { unique: true, partialFilterExpression: { is_default: true } }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;