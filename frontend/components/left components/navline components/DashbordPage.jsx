import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPieChart from '../../right components/CustomPieChart';
import LineChartCard from '../../right components/LineChartCard';
import { useLiveData } from '../../../context/LiveDataContext';
import CandleLoader from '../../top components/CandleLoader'; // 🔹 import CandleLoader

const DashboardPage = () => {
    const [report, setReport] = useState(null);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const liveData = useLiveData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reportRes, tradesRes] = await Promise.all([
                    axios.get('https://smartstock-75j6.onrender.com/reports/get-report', { withCredentials: true }),
                    axios.get('https://smartstock-75j6.onrender.com/stocks/user-stocks', { withCredentials: true }),
                ]);

                if (reportRes.data.success) setReport(reportRes.data.report);
                if (tradesRes.data.success) {
                    setPositions(tradesRes.data.stocks.filter(p => p.status === "open"));
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
            } finally {
                // 🔹 delay 3s to show loader even if fast fetch
                setTimeout(() => setLoading(false), 3000);
            }
        };

        fetchData();
    }, [liveData]);

    useEffect(() => {
        if (!positions.length) return;
        setPositions([...positions]);
    }, [liveData]);

    if (loading) return <CandleLoader />; // 🔹 show candle loader instead of text
    if (error) return <p className="text-red-500">{error}</p>;

    const calcLivePnL = (pos) => {
        const livePrice = liveData[pos.symbol]?.price;
        if (!livePrice) return 0;
        let pnl = pos.tradeType === "buy" ? (livePrice - pos.price) * pos.lotSize : (pos.price - livePrice) * pos.lotSize;
        return pnl;
    };

    const totalUnrealizedPnL = positions.reduce((acc, pos) => acc + calcLivePnL(pos), 0);

    const cards = [
        { title: 'Total Trades', value: report.totalTrades, icon: 'ri-stock-line', color: 'bg-blue-800', change: '+1.27%', trend: 'up' },
        { title: 'Account Value', value: `$${report.accountValue.toFixed(0)}`, icon: 'ri-wallet-3-line', color: 'bg-sky-800', change: '+5.61%', trend: 'up' },
        { title: 'Realized P&L', value: `$${report.realizedPnL.toFixed(0)}`, icon: 'ri-funds-line', color: 'bg-green-600', change: '-2.27%', trend: 'down' },
        { title: 'Unrealized P&L', value: `$${totalUnrealizedPnL.toFixed(2)}`, icon: 'ri-hourglass-line', color: 'bg-red-600', change: '+8.90%', trend: totalUnrealizedPnL < 0 ? 'down' : 'up' },
    ];

    return (
        <div className="w-full h-full px-4 md:px-0">
            {/* Cards Section */}
            <div className="flex flex-wrap gap-5">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white shadow-xl shadow-gray-200 rounded-xl w-full sm:w-[48%] lg:w-[23%] p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-150">
                        <div className="flex gap-3">
                            <div className={`w-[5px] h-20 ${card.color} rounded-2xl`} />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold text-gray-500">{card.title}</span>
                                    <span className="text-xl font-semibold"><i className={card.icon}></i></span>
                                </div>
                                <div className="text-4xl font-semibold py-2 px-1">
                                    {(card.title === "Realized P&L" && (
                                        <span className={`${report.realizedPnL > 0 ? "text-green-600" : report.realizedPnL < 0 ? "text-red-600" : "text-black"}`}>{card.value}</span>
                                    )) || (card.title === "Unrealized P&L" && (
                                        <span className={`${totalUnrealizedPnL > 0 ? "text-green-600" : totalUnrealizedPnL < 0 ? "text-red-600" : "text-black"}`}>{card.value}</span>
                                    )) || <span className="text-gray-900">{card.value}</span>}
                                </div>
                                <div className="text-xl py-1 px-1">
                                    <span className={`${card.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>{card.change}</span>
                                    <span className="text-gray-500 text-sm px-2">Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="w-full mt-8 flex flex-wrap gap-6 justify-between">
                <CustomPieChart report={report} />
                <LineChartCard report={report} />
            </div>
        </div>
    );
};

export default DashboardPage;
