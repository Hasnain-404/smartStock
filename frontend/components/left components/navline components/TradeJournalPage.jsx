import React from 'react';

const tradeLogs = [
    {
        time: '2025-06-20 14:25:21',
        balanceBefore: '0',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '1.15238',
        units: '10000',
        avgPrice: '1.151330',
        currency: 'USD',
        rate: '1.000000',
        pointValue: '1.000000',
    },
    {
        time: '2025-06-20 14:25:21',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'GBPUSD',
        price: '2.15238',
        units: '20000',
        avgPrice: '2.151330',
        currency: 'USD',
        rate: '2.000000',
        pointValue: '2.000000',
    },
    {
        time: '2025-06-20 14:07:50',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '3.15238',
        units: '30000',
        avgPrice: '3.151330',
        currency: 'USD',
        rate: '3.000000',
        pointValue: '3.000000',
    },
    {
        time: '2025-06-20 14:07:50',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '3.15238',
        units: '30000',
        avgPrice: '3.151330',
        currency: 'USD',
        rate: '3.000000',
        pointValue: '3.000000',
    },
    {
        time: '2025-06-20 14:07:50',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '3.15238',
        units: '30000',
        avgPrice: '3.151330',
        currency: 'USD',
        rate: '3.000000',
        pointValue: '3.000000',
    },
    {
        time: '2025-06-20 14:07:50',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '3.15238',
        units: '30000',
        avgPrice: '3.151330',
        currency: 'USD',
        rate: '3.000000',
        pointValue: '3.000000',
    },
    {
        time: '2025-06-20 14:07:50',
        balanceBefore: '10',
        balanceAfter: '20',
        symbol: 'EURUSD',
        price: '3.15238',
        units: '30000',
        avgPrice: '3.151330',
        currency: 'USD',
        rate: '3.000000',
        pointValue: '3.000000',
    },
];

const TradeJournalPage = () => {
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
                            <th className="px-6 py-3">Action</th>
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
                                <td className="px-6 py-4">{log.balanceAfter - log.balanceBefore}</td>
                                <td className="px-6 py-4">{`Close long position for symbol CMCMARKETS:${log.symbol} at price ${log.price} for ${log.units} units. Position AVG Price was ${log.avgPrice}, currency: USD, rate: ${log.rate}, point value: ${log.pointValue}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradeJournalPage;
