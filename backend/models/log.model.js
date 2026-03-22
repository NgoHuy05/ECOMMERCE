import mongoose from "mongoose";

const logSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  action: {
    type: String,
    required: true
  },

  target: {
    type: String
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed
  },

  ip: String,
  user_agent: String

}, { timestamps: true });

logSchema.index({ user_id: 1 });
logSchema.index({ createdAt: -1 });

export default mongoose.model("Log", logSchema);