import React, { useEffect, useState } from "react";
import axios from "axios";
import InvestmentPieChart from "../../right components/InvestmentPieChart";
import ProfitLossBarChart from "../../right components/ProfitLossBarChart";
import PortfolioLineChart from "../../right components/PortfolioLineChart";
import CandleLoader from "../../top components/CandleLoader"; // 🔹 loader

const StatisticsPage = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:3000/reports/get-report", { withCredentials: true });
                setStats(res.data.report);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    if (!stats)
        return (
            <div className="flex justify-center mt-10">
                <CandleLoader /> {/* 🔹 loader instead of Loading... */}
            </div>
        );

    const cards = [
        {
            title: "Avg Return %",
            value: `${stats.avgReaturnPerWeek}%`,
            icon: "ri-line-chart-line",
            color: "bg-green-600",
            change: "+0.42%",
            trend: "up",
        },
        {
            title: "Total Trades Executed",
            value: stats.totalTrades,
            icon: "ri-repeat-line",
            color: "bg-blue-800",
            change: "+3.12%",
            trend: "up",
        },
        {
            title: "Avg Holding Period",
            value: stats.avgHoldingPeriod,
            icon: "ri-time-line",
            color: "bg-yellow-500",
            change: "-0.7d",
            trend: "down",
        },
        {
            title: "Total Losses",
            value: `$${stats.totalLoss}`,
            icon: "ri-arrow-down-circle-line",
            color: "bg-red-600",
            change: "-1.13%",
            trend: "down",
        },
    ];

    const best = stats.bestPerformer;
    let worst = stats.worstPerformer;
    if (best === worst) worst = "-";

    return (
        <div className='w-full h-full px-4 md:px-0'>
            {/* Stats Summary Cards */}
            <div className='flex flex-wrap gap-5'>
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className='bg-white shadow-xl shadow-gray-200 rounded-xl w-full sm:w-[48%] lg:w-[23%] p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-150'
                    >
                        <div className='flex gap-3'>
                            <div className={`w-[5px] h-20 ${card.color} rounded-2xl`} />
                            <div className='flex-1'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-xl font-semibold text-gray-500'>{card.title}</span>
                                    <span className='text-xl font-semibold'>
                                        <i className={card.icon}></i>
                                    </span>
                                </div>
                                <div className='text-4xl font-semibold py-2 px-1'>{card.value}</div>
                                <div className='text-xl py-1 px-1'>
                                    <span className={`${card.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                                        {card.change}
                                    </span>
                                    <span className='text-gray-500 text-sm px-2'>Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <div className='w-full mt-8 flex flex-col gap-6'>
                <div className='flex flex-wrap gap-5 mt-6 justify-center'>
                    <div className='bg-white shadow-xl rounded-xl p-4 w-full sm:w-[48%] lg:w-[30%]'>
                        <div className='text-green-600 text-xl font-semibold mb-2'>
                            <i className="ri-thumb-up-line"></i> Best Performer
                        </div>
                        <div className='text-gray-800 text-2xl font-bold'>{best}</div>
                    </div>
                    <div className='bg-white shadow-xl rounded-xl p-4 w-full sm:w-[48%] lg:w-[30%]'>
                        <div className='text-red-600 text-xl font-semibold mb-2'>
                            <i className="ri-thumb-down-line"></i> Worst Performer
                        </div>
                        <div className='text-gray-800 text-2xl font-bold'>{worst}</div>
                    </div>
                </div>

                <InvestmentPieChart />
                <ProfitLossBarChart />
                <PortfolioLineChart />
            </div>
        </div>
    );
};

export default StatisticsPage;
