import express from "express";
const router = express.Router();
import { createStock, getUserStocks, closeTrade } from "../controllers/stockControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Route to create a new stock entry
router.post("/trade", authMiddleware, createStock);
router.get("/user-stocks", authMiddleware, getUserStocks);
router.post("/close", authMiddleware, closeTrade);

export default router;