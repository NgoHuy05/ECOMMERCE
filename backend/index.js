import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDatabase from "./configs/connectDatabase.js"
import routers from "./routes/index.route.js";

const app = express();
const PORT = process.env.PORT || 8888;

connectDatabase();

app.use(cors({
    origin: [
        "http://localhost:3000"
    ],
    credentials: true
}))

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())

routers(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})