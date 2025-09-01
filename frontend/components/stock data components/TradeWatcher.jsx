import { useEffect } from "react";
import axios from "axios";
import { useLiveData } from "../../context/LiveDataContext";
import { toast } from "react-toastify";

const TradeWatcher = () => {
    const liveData = useLiveData(); // 🔹 context se live price aa raha hai

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                // 🔹 1. User ke open trades fetch karo
                const res = await axios.get("https://smartstock-75j6.onrender.com/stocks/user-stocks", { withCredentials: true });
                const trades = res.data.stocks.filter(t => t.status === "open");

                for (let trade of trades) {
                    const livePrice = getLivePriceFromContext(trade.symbol, liveData);
                    if (!livePrice) continue; // agar price nahi mila to skip

                    // ✅ BUY trades
                    if (trade.tradeType === "buy") {
                        if (trade.takeProfit && livePrice >= trade.takeProfit) {
                            await closeTrade(trade._id, "takeProfit", livePrice);
                            toast.success(`${trade.symbol} TP Hit`);
                            continue;
                        }
                        if (trade.stopLoss && livePrice <= trade.stopLoss) {
                            await closeTrade(trade._id, "stopLoss", livePrice);
                            toast.error(`${trade.symbol} SL Hit`);
                            continue;
                        }
                    }

                    // ✅ SELL trades
                    if (trade.tradeType === "sell") {
                        if (trade.takeProfit && livePrice <= trade.takeProfit) {
                            await closeTrade(trade._id, "takeProfit", livePrice);
                            toast.success(`${trade.symbol} TP Hit`);
                            continue;
                        }
                        if (trade.stopLoss && livePrice >= trade.stopLoss) {
                            await closeTrade(trade._id, "stopLoss", livePrice);
                            toast.error(`${trade.symbol} SL Hit`);
                            continue;
                        }
                    }
                }
            } catch (err) {
                console.error("Watcher error:", err.message);
            }
        }, 2000); // ⏳ 2 sec interval

        return () => clearInterval(interval);
    }, [liveData]);

    return null; // UI me kuch render nahi karega
};

// 🔹 Context se live price lene ka helper function
function getLivePriceFromContext(symbol, liveData) {
    if (!liveData || !symbol) return null;
    return liveData[symbol]?.price || null; // same as PositionsTable
}

// 🔹 Close Trade API with id, reason & price
async function closeTrade(id, reason, currentPrice) {
    await axios.post(
        "https://smartstock-75j6.onrender.com/stocks/close",
        { id, closeReason: reason, currentPrice },
        { withCredentials: true }
    );
}

export default TradeWatcher;
