import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect database success");
    } catch (err) {
        console.log("connect database failed", err?.message || "error");
        process.exit(-1);
    }
}
export default connectDatabase;