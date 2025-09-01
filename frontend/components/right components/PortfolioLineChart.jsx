import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Tooltip, XAxis, YAxis, CartesianGrid,
    LineChart, Line, ResponsiveContainer, Legend
} from "recharts";

const PortfolioLineChart = () => {
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const res = await axios.get("http://localhost:3000/stocks/user-stocks", { withCredentials: true });

                const closedTrades = await res.data;

                if (!closedTrades || closedTrades.length === 0) {
                    setLineData([]);
                    setLoading(false);
                    return;
                }

                // ✅ Group PnL by month
                let portfolioGrowth = {};
                closedTrades.stocks.forEach(t => {
                    if (!t.updatedAt) return;
                    const d = new Date(t.updatedAt);
                    if (isNaN(d)) return;
                    const month = d.toISOString().slice(0, 7); // YYYY-MM
                    portfolioGrowth[month] = (portfolioGrowth[month] || 0) + t.pnl;
                });

                // ✅ Sort months and make cumulative
                const sortedMonths = Object.keys(portfolioGrowth).sort(
                    (a, b) => new Date(a) - new Date(b)
                );

                let cumulative = 0;
                const formattedData = sortedMonths.map(month => {
                    cumulative += portfolioGrowth[month];
                    return { date: month, value: Math.floor(cumulative) }; // 👈 round down values
                });

                setLineData(formattedData);
            } catch (err) {
                console.error("Error fetching trades:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrades();
    }, []);

    if (loading) return <p>Loading chart...</p>;

    return (
        <div>
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Portfolio Growth Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(val) => Math.floor(val)} /> {/* 👈 removes decimals */}
                        <Tooltip formatter={(val) => Math.floor(val)} />     {/* 👈 also tooltip */}
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PortfolioLineChart;
