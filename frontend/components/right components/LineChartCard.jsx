import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Fix 7 din ka structure
const initialData = [
    { name: "Mon", profit: 0, loss: 0 },
    { name: "Tue", profit: 0, loss: 0 },
    { name: "Wed", profit: 0, loss: 0 },
    { name: "Thu", profit: 0, loss: 0 },
    { name: "Fri", profit: 0, loss: 0 },
    { name: "Sat", profit: 0, loss: 0 },
    { name: "Sun", profit: 0, loss: 0 },
];

const LineChartCard = () => {
    const [lineData, setLineData] = useState(initialData);

    useEffect(() => {
        const fetchWeeklyData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/stocks/user-stocks", {
                    withCredentials: true,
                });

                if (res.data.success) {
                    const trades = res.data.stocks;
                    let weekData = [...initialData];

                    trades.forEach((trade) => {
                        if (trade.status !== "closed") return;

                        const d = new Date(trade.createdAt);
                        const dayIndex = d.getDay(); // 0=Sun,1=Mon...
                        const pnl = Math.round(Number(trade.pnl) || 0); // ✅ integer only

                        const idx = dayIndex === 0 ? 6 : dayIndex - 1;

                        if (pnl > 0) {
                            weekData[idx].profit += pnl;
                        } else if (pnl < 0) {
                            weekData[idx].loss += Math.abs(pnl);
                        }
                    });

                    setLineData(weekData);
                }
            } catch (err) {
                console.error("Error fetching weekly data", err);
            }
        };

        fetchWeeklyData();
    }, []);

    return (
        <div className="bg-white w-full lg:flex-1 h-[310px] rounded-xl shadow-xl shadow-gray-200 p-4">
            <div className="text-xl font-semibold text-gray-500 mb-4">
                Weekly Profit vs Loss
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={lineData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                    <YAxis tick={{ fill: "#6b7280" }} />
                    <Tooltip formatter={(value) => `$${Math.round(value)}`} />
                    <Legend />

                    {/* Profit line (green) */}
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                        name="Profit"
                    />

                    {/* Loss line (red) */}
                    <Line
                        type="monotone"
                        dataKey="loss"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                        name="Loss"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartCard;
