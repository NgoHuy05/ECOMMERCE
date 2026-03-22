import mongoose from "mongoose";

const imageProducts = new mongoose.Schema({
    url: { type: String, required: true },
    alt: String
}, { _id: false });


const variantProducts = new mongoose.Schema({
    attributes: {
        type: Map,
        of: String,
        required: true
    },

    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        slug: { type: String, required: true, unique: true },

        description: { type: String, required: true },

        thumbnail: { type: String, required: true },

        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        sold: {
            type: Number,
            default: 0
        },

        rating: {
            type: Number,
            default: 0
        },

        images: [imageProducts],

        variants: [variantProducts]

    },
    { timestamps: true }
);

productSchema.index({ "variants.sku": 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
export default Product