import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const lineData = [
    { name: 'Mon', profit: 0, loss: 10 },
    { name: 'Tue', profit: 100, loss: 0 },
    { name: 'Wed', profit: 200, loss: 0 },
    { name: 'Thu', profit: 350, loss: 100 },
    { name: 'Fri', profit: 400, loss: 0 },
    { name: 'Sat', profit: 0, loss: 0 },
    { name: 'Sun', profit: 530, loss: 0 },
];

const LineChartCard = () => {
    return (
        <div className='bg-white w-full lg:flex-1 h-[310px] rounded-xl shadow-xl shadow-gray-200 p-4'>
            <div className='text-xl font-semibold text-gray-500 mb-4'>Weekly P&L Overview</div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={lineData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                        name="Profit"
                    />
                    <Line
                        type="monotone"
                        dataKey="loss"
                        stroke="#b91c1c"
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
