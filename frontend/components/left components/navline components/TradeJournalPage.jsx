import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandleLoader from "../../top components/CandleLoader"; // 🔹 loader

const TradeJournalPage = () => {
    const [tradeLogs, setTradeLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                // 1️⃣ Get user trades
                const tradesRes = await axios.get(
                    "https://smartstock-75j6.onrender.com/stocks/user-stocks",
                    { withCredentials: true }
                );

                if (tradesRes.data.success) {
                    // ✅ Only closed trades, sort ascending (oldest → newest)
                    const closedTrades = tradesRes.data.stocks
                        .filter((t) => t.status === "closed")
                        .sort(
                            (a, b) =>
                                new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
                        );

                    let runningBalance = 1000000; // 🔹 Starting balance
                    const logs = [];

                    for (let trade of closedTrades) {
                        const balanceBefore = runningBalance;
                        const balanceAfter = balanceBefore + (trade.pnl || 0);
                        runningBalance = balanceAfter; // update for next trade

                        const log = {
                            time: new Date(trade.updatedAt).toLocaleString(),
                            balanceBefore: balanceBefore.toFixed(2),
                            balanceAfter: balanceAfter.toFixed(2),
                            pnl: (trade.pnl || 0).toFixed(2),
                            symbol: trade.symbol,
                            price: trade.exitPrice.toFixed(5),
                            units: trade.lotSize,
                            avgPrice: trade.price.toFixed(5),
                            currency: "USD",
                            rate: "1.000000",
                            pointValue: "1.000000",
                            closeReason: trade.closeReason || "manual",
                            tradeType: trade.tradeType,
                        };

                        logs.push(log);

                        // 2️⃣ Send balanceAfter to backend
                        try {
                            await axios.post(
                                "https://smartstock-75j6.onrender.com/reports/fetch-report",
                                {
                                    balanceAfter: balanceAfter.toFixed(2)
                                },
                                { withCredentials: true }
                            );
                        } catch (err) {
                            console.error("Failed to post report:", err);
                        }
                    }

                    setTradeLogs(logs);
                } else {
                    toast.error("Failed to load trades");
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch trade data");
            } finally {
                setLoading(false);
            }
        };

        fetchTrades();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center mt-10">
                <CandleLoader /> {/* 🔹 loader instead of plain Loading... */}
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trade Journal</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 text-xs">
                        <tr>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Balance Before</th>
                            <th className="px-6 py-3">Balance After</th>
                            <th className="px-6 py-3">Realized P&L</th>
                            <th className="px-6 py-3">Trade Journal</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {tradeLogs.map((log, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-50 transition duration-150"
                            >
                                <td className="px-6 py-4 font-medium">{log.time}</td>
                                <td className="px-6 py-4">{log.balanceBefore}</td>
                                <td className="px-6 py-4">{log.balanceAfter}</td>
                                <td className="px-6 py-4">{log.pnl}</td>
                                <td className="px-6 py-4">
                                    {`Close ${log.tradeType} position for symbol CMCMARKETS:${log.symbol} at price ${log.price} for ${log.units} units. Position AVG Price was ${log.avgPrice}, currency: ${log.currency}, rate: ${log.rate}, point value: ${log.pointValue}. Reason: ${log.closeReason}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradeJournalPage;
