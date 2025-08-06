import React from 'react'

import {
    Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const barData = [
    { stock: 'BTC', profit: 350 },
    { stock: 'EURO', profit: 600 },
];

const ProfitLossBarChart = () => {
    return (
        <>
            <div>
                {/* Profit/Loss by Stock (Bar Chart) */}
                <div className="bg-white rounded shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Profit/Loss by Stock</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="stock" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="profit" fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default ProfitLossBarChart