import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    displayName: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { type: String, required: true },
    avatar: { type: String },
    role: {
        type: String,
        enum: ["user", "manager", "admin", "shop"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "banned"],
        default: "active"
    },
}
    , { timestamps: true }
);
userSchema.index({ role: 1, status: 1 });
const User = mongoose.model("User", userSchema);
export default User;