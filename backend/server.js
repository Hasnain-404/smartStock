import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to Trading Dashboard!")
})

//Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})  