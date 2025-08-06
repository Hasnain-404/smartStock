import React, { useEffect, useState } from 'react';
import { useLiveData } from '../../../context/LiveDataContext';
import BuySellCard from '../../stock data components/BuySellCard';

const symbols = ['BTC/USD', 'EUR/USD'];
const API_KEY = 'a5dda0add8754f5b912a0fcf4c2f4499';

const symbolMeta = {
    'BTC/USD': {
        name: 'Bitcoin / US Dollar',
        icon: 'ri-bit-coin-line',
        color: 'bg-yellow-500/10 text-yellow-600',
    },
    'EUR/USD': {
        name: 'Euro / US Dollar',
        icon: 'ri-money-euro-circle-line',
        color: 'bg-blue-500/10 text-blue-600',
    },
};

const MarketsPage = () => {
    const livePrice = useLiveData(); // Only live price comes from here
    const [apiData, setApiData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = {};
            for (let symbol of symbols) {
                const res = await fetch(
                    `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
                );
                const json = await res.json();
                result[symbol] = json;

                console.log(result);


            }
            setApiData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold mb-6">Market Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 cursor-pointer">
                {symbols.map((symbol, index) => {
                    const info = apiData[symbol];
                    const meta = symbolMeta[symbol];
                    const price = livePrice[symbol.replace('/', '')]?.price; // BTCUSD, EURUSD from live context

                    if (!info) {
                        return (
                            <div key={index} className="p-6 bg-white rounded-xl shadow">
                                Loading {symbol}...
                            </div>
                        );
                    }

                    const change = parseFloat(info.change).toFixed(2);
                    const percentChange = parseFloat(info.percent_change).toFixed(2);
                    const isPositive = parseFloat(info.percent_change) >= 0;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-full text-2xl ${meta.color}`}>
                                    <i className={meta.icon}></i>
                                </div>
                                <div>
                                    <div className="text-gray-800 text-base font-semibold">{meta.name}</div>
                                    <div className="text-xs text-gray-400">{symbol} · FOREX</div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                {price || 'Loading...'} USD
                            </div>
                            <div
                                className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'
                                    }`}
                            >
                                {change} · {percentChange}%
                            </div>

                            {/* Time */}
                            <div className="text-xs text-gray-400 mt-1">
                                Last update {info.datetime}
                            </div>

                            {/* Market status */}
                            {/* Market status */}
                            <div
                                className={`mt-4 px-4 py-1 w-fit rounded-lg text-sm font-medium text-white flex items-center gap-1 
        ${info.is_market_open ? 'bg-green-500' : 'bg-red-500'}`}
                            >
                                <i className={info.is_market_open ? 'ri-sun-line' : 'ri-moon-line'}></i>
                                {info.is_market_open ? 'Main market open' : 'Market closed'}
                            </div>


                            {/* Day Range */}
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-600 mb-1">Day range</p>

                                {/* Range bar */}
                                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                    {parseFloat(info.high) !== parseFloat(info.low) && (
                                        <div
                                            className="absolute top-[-4px] w-[2px] h-4 bg-blue-500"
                                            style={{
                                                left: `${Math.min(
                                                    100,
                                                    Math.max(
                                                        0,
                                                        ((parseFloat(info.close) - parseFloat(info.low)) /
                                                            (parseFloat(info.high) - parseFloat(info.low))) * 100
                                                    )
                                                )}%`,
                                            }}
                                        ></div>
                                    )}
                                </div>

                                {/* Labels */}
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{info.low || '-'}</span>
                                    <span className="text-black font-medium">{info.close || '-'}</span>
                                    <span>{info.high || '-'}</span>
                                </div>
                            </div>


                            {/* Open and Close */}
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                                <div>
                                    <p className="text-gray-400 text-xs">Previous close</p>
                                    <p className="font-medium">{info.previous_close}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Open</p>
                                    <p className="font-medium">{info.open}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarketsPage;
