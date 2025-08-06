import React from 'react';
import InvestmentPieChart from '../../right components/InvestmentPieChart';
import ProfitLossBarChart from '../../right components/ProfitLossBarChart';
import PortfolioLineChart from '../../right components/PortfolioLineChart';

const cards = [
    {
        title: 'Avg Return %',
        value: '+4.28%',
        icon: 'ri-line-chart-line',
        color: 'bg-green-600',
        change: '+0.42%',
        trend: 'up',
    },
    {
        title: 'Total Trades Executed',
        value: '289',
        icon: 'ri-repeat-line',
        color: 'bg-blue-800',
        change: '+3.12%',
        trend: 'up',
    },
    {
        title: 'Avg Holding Period',
        value: '5d 14h',
        icon: 'ri-time-line',
        color: 'bg-yellow-500',
        change: '-0.7d',
        trend: 'down',
    },
    {
        title: 'Total Losses',
        value: '$234',
        icon: 'ri-arrow-down-circle-line',
        color: 'bg-red-600',
        change: '-1.13%',
        trend: 'down',
    },
];

const StatisticsPage = () => {
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

                {/* Best & Worst Performer */}
                <div className='flex flex-wrap gap-5 mt-6 justify-center'>
                    <div className='bg-white shadow-xl rounded-xl p-4 w-full sm:w-[48%] lg:w-[30%]'>
                        <div className='text-green-600 text-xl font-semibold mb-2'><span><i className="ri-thumb-up-line"></i></span> Best Performer</div>
                        <div className='text-gray-800 text-2xl font-bold'>TCS (+6.2%)</div>
                    </div>
                    <div className='bg-white shadow-xl rounded-xl p-4 w-full sm:w-[48%] lg:w-[30%]'>
                        <div className='text-red-600 text-xl font-semibold mb-2'><span><i className="ri-thumb-down-line"></i></span> Worst Performer</div>
                        <div className='text-gray-800 text-2xl font-bold'>INFY (-3.5%)</div>
                    </div>
                </div>
                {/* Pie Chart */}
                <InvestmentPieChart />

                {/* Bar Chart */}
                <ProfitLossBarChart />

                {/* Line Chart */}
                <PortfolioLineChart />
            </div>
        </div>
    );
};

export default StatisticsPage;
