import Stock from "../models/stockModel.js";
import UserReport from "../models/userReportModel.js";

// Controller to create a new stock entry
const createStock = async (req, res) => {
    try {
        const userId = req.user._id;
        const { symbol, price, lotSize, tradeType, tpPoints, slPoints } = req.body;

        const tradeAmount = lotSize * price;

        // Find user report
        let report = await UserReport.findOne({ userId });
        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        // ✅ Funds check
        if (report.accountValue < tradeAmount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient funds to place this order",
            });
        }

        // ✅ Calculate TP & SL based on user input (points)
        let takeProfit, stopLoss;
        if (tradeType === "buy") {
            takeProfit = price + tpPoints;
            stopLoss = price - slPoints;
        } else if (tradeType === "sell") {
            takeProfit = price - tpPoints;
            stopLoss = price + slPoints;
        }

        // Save trade in DB
        const trade = new Stock({
            user: userId,
            symbol,
            price,
            lotSize,
            tradeType,
            takeProfit,
            stopLoss,
        });
        await trade.save();

        // ✅ Update user report
        report.totalTrades += 1;
        report.accountValue -= tradeAmount;
        await report.save();

        res.status(201).json({
            success: true,
            message: `${tradeType} order placed successfully`,
            trade,
            report,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};


// Get all stocks for a user
const getUserStocks = async (req, res) => {
    try {
        const userId = req.user._id;
        const stocks = await Stock.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, stocks });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const closeTrade = async (req, res) => {
    try {
        const { id, closeReason: rawReason, currentPrice } = req.body;
        const userId = req.user._id;

        const stock = await Stock.findOne({ _id: id, user: userId, status: "open" });
        if (!stock) {
            return res.status(404).json({ success: false, message: "Trade not found" });
        }

        // ✅ Map rawReason to enum
        let closeReason = "manual";
        if (rawReason === "TP Hit" || rawReason === "SL Hit" || rawReason === "manual") {
            closeReason = rawReason;
        } else if (rawReason === "takeProfit") {
            closeReason = "TP Hit";
        } else if (rawReason === "stopLoss") {
            closeReason = "SL Hit";
        }

        // ✅ Use actual currentPrice for exitPrice
        const exitPrice = currentPrice;

        let pnl = 0;

        if (stock.symbol === "EURUSD") {
            // 1 pip = 0.0001, 1 lot = 10$ per pip
            const pipValue = 10 * stock.lotSize;
            const pointDiff = (exitPrice - stock.price) / 0.0001;
            pnl = stock.tradeType === "buy" ? pointDiff * pipValue : -pointDiff * pipValue;
        } else if (stock.symbol === "BTCUSD") {
            const pointDiff = exitPrice - stock.price;
            pnl = stock.tradeType === "buy" ? pointDiff * stock.lotSize : -pointDiff * stock.lotSize;
        }

        pnl = parseFloat(pnl.toFixed(2));


        // 🔹 Fetch user report
        let userReport = await UserReport.findOne({ userId });
        if (!userReport) {
            userReport = new UserReport({ userId, accountValue: 1000000 });
            await userReport.save();
        }

        const investedAmount = stock.price * stock.lotSize;
        const balanceBefore = userReport.accountValue;
        const balanceAfter = balanceBefore + investedAmount + pnl;

        // ✅ Update trade
        stock.status = "closed";
        stock.exitPrice = exitPrice;
        stock.pnl = parseFloat(pnl.toFixed(2));
        stock.closeReason = closeReason;
        stock.result = pnl > 0 ? "profit" : pnl < 0 ? "loss" : "breakeven";
        stock.balanceBefore = balanceBefore;
        stock.balanceAfter = balanceAfter;
        await stock.save();

        // ✅ Update user account
        userReport.accountValue = balanceAfter;
        userReport.realizedPnL = (userReport.realizedPnL || 0) + pnl;
        if (pnl > 0) userReport.totalProfit = (userReport.totalProfit || 0) + pnl;
        if (pnl < 0) userReport.totalLoss = (userReport.totalLoss || 0) + Math.abs(pnl);
        await userReport.save();

        return res.json({
            success: true,
            message: "Trade closed successfully",
            trade: stock,
            balanceBefore,
            balanceAfter,
            accountValue: userReport.accountValue,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};




export { createStock, getUserStocks, closeTrade };
