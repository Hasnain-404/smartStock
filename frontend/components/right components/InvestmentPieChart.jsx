import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#a78bfa", "#34d399"];

const InvestmentPieChart = () => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const { data } = await axios.get("https://smartstock-75j6.onrender.com/reports/get-report", { withCredentials: true });
                if (data.success && data.report?.investmentDistribution) {
                    const dist = data.report.investmentDistribution;

                    const formatted = Object.keys(dist).map((key, idx) => ({
                        name: key,
                        value: dist[key],
                        color: COLORS[idx % COLORS.length],
                    }));

                    setPieData(formatted);
                } else {
                    setPieData([]); // no data
                }
            } catch (err) {
                console.error("Error fetching investment distribution:", err);
                setPieData([]);
            }
        };

        fetchReport();
    }, []);

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Investment Distribution</h2>

            {pieData.length === 0 ? (
                <div className="flex items-center justify-center h-[250px] text-gray-500 font-semibold">
                    No trades open right now
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default InvestmentPieChart;
