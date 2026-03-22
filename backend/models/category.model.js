import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    slug: { type: String, required: true, unique: true },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },    
    description: { type: String, required: true},
    image: { type: String },
}, {timestamps: true}
);

categorySchema.index({ slug: 1 });
categorySchema.index({ parent_id: 1 });

const Category = mongoose.model("Category", categorySchema);
export default Category;