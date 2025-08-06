import React from 'react'

import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer,
} from 'recharts';


const pieData = [
    { name: 'BTC', value: 45, color: '#4ade80' },
    { name: 'EURO', value: 30, color: '#f87171' },
];

const InvestmentPieChart = () => {
    return (
        <>

            <div>
                {/* Investment Distribution (Pie Chart) */}
                <div className="bg-white rounded shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Investment Distribution</h2>
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
                </div>
            </div>
        </>
    )
}

export default InvestmentPieChart