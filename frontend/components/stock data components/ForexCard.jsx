import React from 'react';
import MarketStatusCard from './MarketStatusCard';

const ForexCard = ({ data }) => {
    const {
        symbol,
        name,
        price,
        change,
        percent_change,
        previous_close,
        open,
        high,
        low,
        last_update,
    } = data;

    const isUp = parseFloat(change) >= 0;

    return (
        <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-xs">
            {/* Title */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="font-semibold text-gray-800">{name}</h2>
                    <span className="text-sm text-gray-500">{symbol} · FOREX</span>
                </div>
                <img
                    src="https://flagcdn.com/us.svg"
                    alt="flag"
                    className="w-6 h-6 rounded-full border"
                />
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">{price} <span className="text-base text-gray-500">USD</span></div>

            {/* Change */}
            <div className={`text-sm font-medium mt-1 ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                {change} · {percent_change}%
            </div>

            {/* Last update */}
            <div className="text-xs text-gray-400 mt-1">Last update: {last_update}</div>

            {/* Market Tag */}
            <div className="mt-3">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">🌞 Main market</span>
            </div>

            {/* Range Bar */}
            <div className="mt-4">
                <label className="text-xs text-gray-500">Day range</label>
                <div className="relative h-1 bg-gray-200 rounded mt-1 mb-1">
                    <div
                        className="absolute h-1 bg-blue-500 rounded"
                        style={{
                            left: `${((parseFloat(price) - parseFloat(low)) / (parseFloat(high) - parseFloat(low))) * 100}%`,
                            width: '6px',
                            top: '-2px',
                            height: '12px',
                        }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{low}</span>
                    <span>{high}</span>
                </div>
            </div>

            {/* Extra Info */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                    <span>Previous close</span>
                    <span className="font-semibold">{previous_close}</span>
                </div>
                <div className="flex justify-between">
                    <span>Open</span>
                    <span className="font-semibold">{open}</span>
                </div>
            </div>

            <MarketStatusCard />
        </div>
    );
};

export default ForexCard;
