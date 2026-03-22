import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        require: true
    }
},
    {
        timestamps: true
    })

const Session = mongoose.model('Session', sessionSchema);
export default Session;