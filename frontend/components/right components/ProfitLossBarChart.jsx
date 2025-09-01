import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from "recharts";

const ProfitLossBarChart = () => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        const fetchPL = async () => {
            try {
                const res = await axios.get("http://localhost:3000/stocks/user-stocks", { withCredentials: true });
                const trades = res.data.stocks || [];

                let profitLossMap = {};

                trades.forEach((t) => {
                    const entry = Number(t.price) || 0;
                    const exit = Number(t.exitPrice) || 0;
                    const lot = Number(t.lotSize) || 0;

                    let pl = 0;

                    if (t.status === "closed") {
                        if (t.symbol === "EURUSD") {
                            const pipValue = 10 * lot;
                            const pointDiff = (exit - entry) / 0.0001;
                            pl = t.tradeType === "buy" ? pointDiff * pipValue : -pointDiff * pipValue;
                        } else {
                            pl = t.tradeType === "buy" ? (exit - entry) * lot : (entry - exit) * lot;
                        }
                    }

                    profitLossMap[t.symbol] = (profitLossMap[t.symbol] || 0) + pl;
                });

                const chartData = Object.keys(profitLossMap).map((symbol) => ({
                    stock: symbol,
                    profit: profitLossMap[symbol],
                }));

                setBarData(chartData);
            } catch (err) {
                console.error("Error fetching profit/loss:", err);
            }
        };

        fetchPL();
    }, []);

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Profit/Loss by Stock</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stock" />
                    <YAxis tickFormatter={(val) => Math.round(val)} />
                    <Tooltip formatter={(val) => Math.round(val)} />
                    <Bar dataKey="profit">
                        {barData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.profit >= 0 ? "#22c55e" : "#ef4444"} // green if profit, red if loss
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfitLossBarChart;
