import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]

}, { timestamps: true });

wishlistSchema.index({ user_id: 1 });

export default mongoose.model("Wishlist", wishlistSchema);