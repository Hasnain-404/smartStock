import UserReport from "../models/userReportModel.js";
import Stock from "../models/stockModel.js";

// ✅ Get Report with Calculated Stats
const getOrCreateUserReport = async (req, res) => {
    try {
        const userId = req.user?._id;

        // Report check
        let report = await UserReport.findOne({ userId });
        if (!report) {
            report = new UserReport({ userId, accountValue: 1000000 });
            await report.save();
        }

        // 👉 Get all trades of user
        const trades = await Stock.find({ user: userId });

        // Separate open & closed
        const closedTrades = trades.filter(t => t.status === "closed");
        const openTrades = trades.filter(t => t.status === "open");

        // ----------- CALCULATIONS -------------

        // Total Trades
        const totalTrades = trades.length;

        // Avg Return % (closed trades only)
        let avgReturn = 0;
        if (closedTrades.length > 0) {
            const totalReturn = closedTrades.reduce((sum, t) => {
                const invested = t.price * t.lotSize;
                if (!t.exitPrice || !invested) return sum;
                return sum + (((t.exitPrice - t.price) * t.lotSize) / invested) * 100;
            }, 0);
            avgReturn = totalReturn / closedTrades.length;
        }

        // Avg Holding Period (in days)
        let avgHolding = 0;
        if (closedTrades.length > 0) {
            const holding = closedTrades
                .map(t => {
                    if (!t.createdAt || !t.updatedAt) return null;
                    const start = new Date(t.createdAt);
                    const end = new Date(t.updatedAt);
                    if (isNaN(start) || isNaN(end)) return null;
                    return (end - start) / (1000 * 60 * 60 * 24);
                })
                .filter(v => v !== null);

            if (holding.length > 0) {
                avgHolding = holding.reduce((a, b) => a + b, 0) / holding.length;
            }
        }

        // Best & Worst Performer (by pnl)
        let bestPerformer = null;
        let worstPerformer = null;
        if (closedTrades.length > 0) {
            const best = closedTrades.reduce((prev, cur) => (cur.pnl > prev.pnl ? cur : prev));
            const worst = closedTrades.reduce((prev, cur) => (cur.pnl < prev.pnl ? cur : prev));
            bestPerformer = `${best.symbol} (+${best.pnl.toFixed(2)})`;
            worstPerformer = `${worst.symbol} (${worst.pnl.toFixed(2)})`;
        }

        let investmentDistribution = {};
        openTrades.forEach(t => {
            const entryPrice = Number(t.price) || 0;
            const lotSize = Number(t.lotSize) || 0;

            const invested = entryPrice * lotSize;

            investmentDistribution[t.symbol] =
                (investmentDistribution[t.symbol] || 0) + invested;
        });

        // Profit/Loss by Stock (closed trades only)
        let profitLossByStock = {};
        closedTrades.forEach(t => {
            profitLossByStock[t.symbol] = (profitLossByStock[t.symbol] || 0) + t.pnl;
        });

        // Portfolio Growth Over Time (monthly)
        let portfolioGrowth = {};
        closedTrades.forEach(t => {
            if (!t.updatedAt) return;
            const d = new Date(t.updatedAt);
            if (isNaN(d)) return;
            const month = d.toISOString().slice(0, 7); // YYYY-MM
            portfolioGrowth[month] = (portfolioGrowth[month] || 0) + t.pnl;
        });

        // Update report values
        report.totalTrades = totalTrades;
        report.avgReaturnPerWeek = avgReturn;
        report.avgHoldingPeriod = avgHolding;

        await report.save();

        // Send everything
        res.status(200).json({
            success: true,
            report: {
                ...report._doc,
                avgReaturnPerWeek: avgReturn.toFixed(2),
                avgHoldingPeriod: avgHolding.toFixed(1),
                bestPerformer,
                worstPerformer,
                investmentDistribution,
                profitLossByStock,
                portfolioGrowth,
                totalLoss: report.totalLoss?.toFixed(2) || "0.00",
            },
        });
    } catch (error) {
        console.error("❌ Error in getOrCreateUserReport:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update user's report after trades
const updateUserReport = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { realizedPnL, profit, loss, tradeAmount, tradeAction } = req.body;

        let report = await UserReport.findOne({ userId });
        if (!report) return res.status(404).json({ message: "Report not found" });

        const balanceBefore = report.accountValue; // 👈 balance before trade

        // Update realizedPnL, profit, loss (increment instead of overwrite)
        if (realizedPnL !== undefined) report.realizedPnL += realizedPnL;
        if (profit !== undefined) report.totalProfit += profit;
        if (loss !== undefined) report.totalLoss += loss;

        // Handle trade
        if (tradeAmount && tradeAction) {
            if (tradeAction === "buy" || tradeAction === "sell") {
                if (report.accountValue < tradeAmount) {
                    return res.status(400).json({ message: "❌ Insufficient funds!" });
                }
                report.accountValue -= tradeAmount; // reduce balance
            } else if (tradeAction === "close") {
                report.accountValue += tradeAmount; // add balance back
            }
            report.totalTrades += 1;
        }

        await report.save();

        const balanceAfter = report.accountValue; // 👈 after trade

        res.status(200).json({
            success: true,
            balanceBefore,
            balanceAfter,
            report,
        });
    } catch (error) {
        console.error("❌ Error in updateUserReport:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get user account value
const getUserAccountValue = async (req, res) => {
    try {

        const userId = req.user?._id;

        if (!userId) return null;

        const userReport = await UserReport.findOne({ userId });

        if (!userReport) return null;

        res.status(200).json({ success: true, accountValue: userReport.accountValue });
        const report = await UserReport.findOne({ userId });
        return report ? report.accountValue : null;
    } catch (error) {
        console.error("Error fetching user account value:", error);
        return null;
    }
};

export { getOrCreateUserReport, updateUserReport, getUserAccountValue };
