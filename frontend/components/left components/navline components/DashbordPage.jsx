import React from 'react';
import CustomPieChart from '../../right components/CustomPieChart';
import LineChartCard from '../../right components/LineChartCard';

const DashboardPage = () => {
    const cards = [
        {
            title: 'Total Trades',
            value: '201',
            icon: 'ri-stock-line',
            color: 'bg-blue-800',
            change: '+1.27%',
            trend: 'up',
        },
        {
            title: 'Account Value',
            value: '$100',
            icon: 'ri-wallet-3-line',
            color: 'bg-sky-800',
            change: '+5.61%',
            trend: 'up',
        },
        {
            title: 'Realized P&L',
            value: '$700',
            icon: 'ri-funds-line',
            color: 'bg-green-600',
            change: '-2.27%',
            trend: 'down',
        },
        {
            title: 'Unrealized P&L',
            value: '$536',
            icon: 'ri-hourglass-line',
            color: 'bg-red-600',
            change: '+8.90%',
            trend: 'up',
        },
    ];

    return (
        <div className='w-full h-full px-4 md:px-0'>
            {/* Cards Section */}
            <div className='flex flex-wrap gap-5'>
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className='bg-white shadow-xl shadow-gray-200 rounded-xl w-full sm:w-[48%] lg:w-[23%] p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-150'
                    >
                        <div className='flex gap-3'>
                            {/* Colored Line */}
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

            {/* Charts Section */}
            <div className='w-full mt-8'>
                <div className='flex flex-wrap gap-6 justify-between'>

                    {/* Pie Chart Card */}
                    <CustomPieChart />

                    {/* Graph Area */}
                    <LineChartCard />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
