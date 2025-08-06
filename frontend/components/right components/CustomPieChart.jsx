import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Sector,
} from 'recharts';

// Chart Data
const data = [
    { name: 'Profit', value: 700, color: '#16a34a' },
    { name: 'Loss', value: 536, color: '#b91c1c' },
    { name: 'Charge', value: 54, color: '#374151' },
];

const CustomPieChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseEnter = (_, index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    const renderActiveShape = (props) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
        } = props;

        return (
            <g style={{ transition: 'all 0.3s ease-in-out' }}>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <div className='bg-white w-full lg:w-[400px] h-[310px] rounded-xl shadow-xl shadow-gray-200 p-4'>
            <div className='text-lg md:text-xl font-semibold text-gray-500 mb-4'>Trades Statistics</div>

            <div className='flex items-center justify-center sm:justify-start'>
                {/* Pie Chart */}
                <div className='w-[200px] sm:w-[230px] h-[200px] sm:h-[230px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        cursor="pointer"
                                        style={{
                                            transition: 'all 0.3s ease-in-out',
                                            transformOrigin: 'center',
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Right side stats (hidden on mobile) */}
                <div className='pl-6 space-y-3 hidden sm:block'>
                    {data.map((item, idx) => (
                        <div key={idx}>
                            <div className='text-gray-500 text-base md:text-lg lg:text-xl'>Total {item.name}</div>
                            <div className='flex items-center gap-2'>
                                <div
                                    className='w-[12px] h-[12px] rounded-full'
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className='text-base md:text-lg font-semibold'>${item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomPieChart;
