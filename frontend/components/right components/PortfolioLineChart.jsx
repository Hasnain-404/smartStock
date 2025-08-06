import React from 'react'
import {
    Tooltip, XAxis, YAxis, CartesianGrid,
    LineChart, Line, ResponsiveContainer, Legend
} from 'recharts';

const lineData = [
    { date: 'Jan', value: 1000 },
    { date: 'Feb', value: 10500 },
    { date: 'Mar', value: 9800 },
    { date: 'Apr', value: 11000 },
    { date: 'May', value: 1100 },
    { date: 'Jun', value: 400 },
    { date: 'Jul', value: 21400 },
    { date: 'Aug', value: 40000 },
    { date: 'Sep', value: 25000 },
    { date: 'Oct', value: 133465 },
    { date: 'Nov', value: 98764 },
    { date: 'Dec', value: 123458 },
];

const PortfolioLineChart = () => {
    return (
        <>
            <div>
                {/* Portfolio Growth Over Time */}
                <div className="bg-white rounded shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Portfolio Growth Over Time</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default PortfolioLineChart