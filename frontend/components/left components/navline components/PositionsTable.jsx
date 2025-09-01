import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLiveData } from "../../../context/LiveDataContext";
import CandleLoader from "../../top components/CandleLoader"; // 🔹 add loader

const PositionsTable = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const liveData = useLiveData();

    const fetchUserStocks = useCallback(async () => {
        try {
            const res = await axios.get("https://smartstock-75j6.onrender.com/stocks/user-stocks", {
                withCredentials: true,
            });
            if (res.data.success) {
                return res.data.stocks || [];
            } else {
                toast.error(res.data.message || "Failed to load stocks");
                return [];
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch user stocks");
            return [];
        }
    }, []);

    const getLivePrice = (symbol) => liveData[symbol]?.price || null;

    const calculatePnL = (pos) => {
        if (!pos.symbol || (pos.symbol !== "EURUSD" && pos.symbol !== "BTCUSD")) return 0;
        if (pos.status === "closed") return pos.pnl || 0;

        const livePrice = getLivePrice(pos.symbol);
        if (!livePrice) return 0;

        let pipValue = 0;
        let pnl = 0;

        if (pos.symbol === "EURUSD") {
            pipValue = 10 * pos.lotSize;
            const pointDiff = (livePrice - pos.price) / 0.0001;
            pnl = pos.tradeType === "buy" ? pointDiff * pipValue : -pointDiff * pipValue;
        } else if (pos.symbol === "BTCUSD") {
            pipValue = 1 * pos.lotSize;
            const pointDiff = livePrice - pos.price;
            pnl = pos.tradeType === "buy" ? pointDiff * pipValue : -pointDiff * pipValue;
        }

        return parseFloat(pnl.toFixed(0));
    };

    const getDisplayTP = (pos) => {
        if (!pos.takeProfit) return "-";
        if (pos.symbol === "EURUSD") {
            if (pos.tradeType === "buy") return (pos.price + pos.takeProfit * 0.0001).toFixed(5);
            else return (pos.price - pos.takeProfit * 0.0001).toFixed(5);
        }
        return pos.takeProfit.toFixed(2);
    };

    const getDisplaySL = (pos) => {
        if (!pos.stopLoss) return "-";
        if (pos.symbol === "EURUSD") {
            if (pos.tradeType === "buy") return (pos.price - pos.stopLoss * 0.0001).toFixed(5);
            else return (pos.price + pos.stopLoss * 0.0001).toFixed(5);
        }
        return pos.stopLoss.toFixed(2);
    };

    const handleClose = async (id, reason = "manual") => {
        const pos = positions.find((p) => p._id === id);
        const livePrice = getLivePrice(pos?.symbol);
        if (!livePrice) return toast.error("Cannot fetch live price");

        try {
            const res = await axios.post(
                "https://smartstock-75j6.onrender.com/stocks/close",
                { id, closeReason: reason, currentPrice: livePrice },
                { withCredentials: true }
            );
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error closing trade");
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            const freshPositions = (await fetchUserStocks()).filter(p => p.status === "open");
            setPositions(freshPositions);

            for (const pos of freshPositions) {
                const livePrice = getLivePrice(pos.symbol);
                if (!livePrice) continue;

                // TP/SL auto-close
                if (pos.symbol === "EURUSD") {
                    if (pos.takeProfit && pos.takeProfit > 0) {
                        const tpPrice = pos.tradeType === "buy"
                            ? parseFloat((pos.price + pos.takeProfit * 0.0001).toFixed(5))
                            : parseFloat((pos.price - pos.takeProfit * 0.0001).toFixed(5));
                        if ((pos.tradeType === "buy" && livePrice >= tpPrice) || (pos.tradeType === "sell" && livePrice <= tpPrice)) {
                            await handleClose(pos._id, "takeProfit");
                            continue;
                        }
                    }
                    if (pos.stopLoss && pos.stopLoss > 0) {
                        const slPrice = pos.tradeType === "buy"
                            ? parseFloat((pos.price - pos.stopLoss * 0.0001).toFixed(5))
                            : parseFloat((pos.price + pos.stopLoss * 0.0001).toFixed(5));
                        if ((pos.tradeType === "buy" && livePrice <= slPrice) || (pos.tradeType === "sell" && livePrice >= slPrice)) {
                            await handleClose(pos._id, "stopLoss");
                            continue;
                        }
                    }
                } else if (pos.symbol === "BTCUSD") {
                    if (pos.takeProfit && pos.takeProfit > 0) {
                        if ((pos.tradeType === "buy" && livePrice >= pos.takeProfit) || (pos.tradeType === "sell" && livePrice <= pos.takeProfit)) {
                            await handleClose(pos._id, "takeProfit");
                            continue;
                        }
                    }
                    if (pos.stopLoss && pos.stopLoss > 0) {
                        if ((pos.tradeType === "buy" && livePrice <= pos.stopLoss) || (pos.tradeType === "sell" && livePrice >= pos.stopLoss)) {
                            await handleClose(pos._id, "stopLoss");
                            continue;
                        }
                    }
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [liveData, fetchUserStocks]);

    useEffect(() => {
        (async () => {
            const openTrades = (await fetchUserStocks()).filter(p => p.status === "open");
            setPositions(openTrades);
            setLoading(false);
        })();
    }, [fetchUserStocks]);

    return (
        <div className="w-full bg-gray-50 px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Open Positions</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                {loading ? (
                    <div className="p-6 flex justify-center"><CandleLoader /></div> // 🔹 loader added
                ) : positions.length === 0 ? (
                    <p className="p-6 text-gray-500">No open positions</p>
                ) : (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 text-xs">
                            <tr>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Symbol</th>
                                <th className="px-6 py-3">Side</th>
                                <th className="px-6 py-3">Entry</th>
                                <th className="px-6 py-3">Size</th>
                                <th className="px-6 py-3">TP</th>
                                <th className="px-6 py-3">SL</th>
                                <th className="px-6 py-3">Current Price</th>
                                <th className="px-6 py-3">PnL</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {positions.map((pos) => {
                                const pnl = calculatePnL(pos);
                                const displayTP = getDisplayTP(pos);
                                const displaySL = getDisplaySL(pos);
                                return (
                                    <tr key={pos._id} className="border-b hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 font-medium">
                                            {pos.createdAt ? new Date(pos.createdAt).toLocaleString() : "-"}
                                        </td>
                                        <td className="px-6 py-4">{pos.symbol}</td>
                                        <td className={`px-6 py-4 font-semibold ${pos.tradeType === "buy" ? "text-green-600" : "text-red-600"}`}>{pos.tradeType}</td>
                                        <td className="px-6 py-4">{pos.price}</td>
                                        <td className="px-6 py-4">{pos.lotSize}</td>
                                        <td className="px-6 py-4">{displayTP || "-"}</td>
                                        <td className="px-6 py-4">{displaySL || "-"}</td>
                                        <td className="px-6 py-4">{getLivePrice(pos.symbol) || "-"}</td>
                                        <td className={`px-6 py-4 font-bold ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>{pnl}</td>
                                        <td className="px-6 py-4 ">
                                            <button onClick={() => handleClose(pos._id, "manual")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
                                                Close
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PositionsTable;
