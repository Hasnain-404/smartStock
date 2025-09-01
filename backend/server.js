import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"; //user routes
import stockRouter from "./routes/stockRoutes.js"; //stock routes
import userReportRouter from "./routes/userReportRoutes.js"; //user report routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

app.use(cookieParser());

// CORS setup
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // allow cookies
}));

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to Trading Dashboard!")
})

app.use(express.json());
app.use("/auth", userRouter); //user routes
app.use("/stocks", stockRouter); //stock routes
app.use("/reports", userReportRouter); //user report routes


//Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})  